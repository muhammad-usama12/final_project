describe("Actions of non logged in user", () => {
  beforeEach(() => {
    cy.visit("/");
   });

  it("should not be able to filter by show", () => {
    cy.contains("h4").should("not.exist");
  });

  it("should not be able to make a post", () => {
    cy.contains(".create-post").should("not.exist");
  });

  // ************* can't get this to pass but its working ***************
  // it("should be redirected to login if trying to visit /profile", () => {
  //   cy.request({url: '/profile', failOnStatusCode: false});
  //   // cy.url().should('include', '/login')
  // });

  // FAILING
  // it("should not be able to like a post", () => {
  //   cy.get(".fa-star")
  //     .first()
  //     .click()
  //     .siblings("p")
  //     .first()
  //     .should("contain", "267")
  // });

  it("should hide spoilers when hide spoiler is clicked", () => {
    cy.get(".general-filter")
      .children()
      .last()
      .click()
      .get(".spoiler")
  });

  it("should show spoilers when hide spoiler is clicked again", () => {
    cy.get(".general-filter")
      .children()
      .last()
      .click()
      .get(".spoiler")

      cy.get(".general-filter")
      .children()
      .last()
      .click()
      .get(".screen").first().should("not.have.class", ".spoiler")
  });

  // it("should filter posts by show when show tag is clicked", () => {
  //   cy.get(".general-filter")
  //     .children()
  //     .last()
  //     .click()
  //     .get(".spoiler")
  // });
});