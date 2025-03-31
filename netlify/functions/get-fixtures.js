const fetch = require('node-fetch');
const xml2js = require('xml2js');

exports.handler = async function () {
  const url = 'https://www-service.fanzo.com/venues/127232/fixture/xml?newFields=1';

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'NetlifyFunction/1.0'
      }
    });

    const xml = await response.text();

    const result = await xml2js.parseStringPromise(xml, { mergeAttrs: true });

    if (
      !result.venue ||
      !result.venue.fixtures ||
      !result.venue.fixtures[0].fixture
    ) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          error: "No fixtures found in response",
          rawVenue: result.venue || null
        })
      };
    }

    const fixtures = result.venue.fixtures[0].fixture.map(f => {
      return {
        title: f.title?.[0] || "Untitled",
        description: f.description?.[0] || "No description",
        startTimeLocal: f.startTimeLocal?.[0] || "Unknown time"
      };
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ fixtures })
    };
  } catch (error) {
    console.error("Parsing Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to fetch or parse XML',
        details: error.message
      })
    };
  }
};
