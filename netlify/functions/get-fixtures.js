const fetch = require('node-fetch');
const xml2js = require('xml2js');

exports.handler = async function () {
  const url = 'https://www-service.fanzo.com/venues/127232/fixture/xml?newFields=1';

  try {
    const response = await fetch(url);
    const xml = await response.text();

    const result = await xml2js.parseStringPromise(xml, { mergeAttrs: true });

    const fixtures = result.venue.fixtures[0].fixture.map(f => {
      return {
        name: f.name[0],
        startTime: f.start_time[0],
      };
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ fixtures })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch or parse XML', details: error.message })
    };
  }
};
