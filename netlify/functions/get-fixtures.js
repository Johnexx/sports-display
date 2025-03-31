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

    console.log("RAW XML RESPONSE:\n", xml.substring(0, 500));

    const result = await xml2js.parseStringPromise(xml, { mergeAttrs: true });

    if (!result.venue || !result.venue.fixtures || !result.venue.fixtures[0].fixture) {
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
        name: f.name?.[0] || "Unnamed Match",
        startTime: f.start_time?.[0] || "Unknown Time"
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
