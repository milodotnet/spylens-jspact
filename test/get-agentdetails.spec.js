"use strict"

const chai = require("chai")
const expect = require("chai").expect
const path = require("path")
const { Pact } = require("@pact-foundation/pact")
const { getAgentDetails } = require("../index")
const chaiAsPromised  = require('chai-as-promised');
chai.use(chaiAsPromised);

describe("The Spymaster API", () => {
  let url = "http://localhost"
  const port = 8992

  const provider = new Pact({
    port: port,
    log: path.resolve(process.cwd(), "logs", "mockserver-integration.log"),
    dir: path.resolve(process.cwd(), "pacts"),
    spec: 2, //you need this for better matchers  
    consumer: "SpyLens JS Frontend",
    provider: "SpyMaster Api",
    pactfileWriteMode: "merge",
  })
   
  // Setup the provider
  before(() => provider.setup())

  // Write Pact when all tests done
  after(() => {
    return provider.finalize();
  })

  // verify with Pact, and reset expectations
  afterEach(() => provider.verify())

  describe("get /agents/007", () => {
    before(done => {
      const interaction = {
        state: "An agent '007' exists",
        uponReceiving: "a request to retrieve agent '007'",
        withRequest: {
          method: "GET",
          path: "/agents/007",
          headers: {
            Accept: "application/json",
          },
        },
        willRespondWith: {
          status: 200,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: {
              ...
          }
        },
      }
      provider.addInteraction(interaction).then(() => {
        done()
      })
    })

    it("returns the correct response", function() {
      const EXPECTED_BODY = 
      {
       ...
      }

      const urlAndPort = {
        url: url,
        port: port,
      }

      var actual = getAgentDetails(urlAndPort, "007");
      return expect(actual).to.eventually.become(EXPECTED_BODY);      
    })
  })
})