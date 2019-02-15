describe("Index", () => {

  document: HTMLDocument;

  beforeAll(done => {
    document = karmaHTML.index.document;
    jasmine.addMatchers(DOMCustomMatchers);
    karmaHTML.index.open();
    karmaHTML.index.onstatechange = (ready) => {
      ready && done();
    };
  });

  it("should be a real Document object", () => {
    expect(document.constructor.name).toEqual('HTMLDocument');
  })

});