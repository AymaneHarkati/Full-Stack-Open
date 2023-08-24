describe("Blog app", function () {
  describe("Auth Testing", function () {
    beforeEach(function () {
      cy.request("POST", "http://localhost:3001/api/testing/reset");
      const user = {
        name: "Matti Luukkainen",
        username: "testing",
        password: "12345678",
      };
      cy.request("POST", "http://localhost:3001/api/user/", user);
      const newUser = {
        name: "Matti Luukkainen",
        username: "random",
        password: "12345678",
      };
      cy.request("POST", "http://localhost:3001/api/user/", newUser);
      cy.visit("http://localhost:3000");
    });

    it("Login form is shown", function () {
      cy.get("#login-form").click();
      cy.get("#log-form").should("exist");
    });
    it("checking auth sucess", function () {
      cy.get("#login-form").click();
      cy.get("#username").type("testing");
      cy.get("#password").type("12345678");
      cy.get("#log-in-button").click();
      cy.get("#notification").should("exist");
    });
    it("checking auth fail", function () {
      cy.get("#login-form").click();
      cy.get("#username").type("test");
      cy.get("#password").type("www.kklm.com");
      cy.get("#log-in-button").click();
      cy.get("#notification.errorMessage")
        .should("exist")
        .should("have.css", "color", "rgb(255, 0, 0)");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      const user = {
        username: "testing",
        password: "12345678",
      };
      cy.request("POST", "http://localhost:3001/api/login/", user).then(
        (res) => {
          localStorage.setItem("connectedUser", JSON.stringify(res.body));
          cy.visit("http://localhost:3000");
        }
      );
    });
    it("A blog can be created", function () {
      cy.get("#new-blog").click();
      cy.get("#title").type("last-cypress");
      cy.get("#author").type("full stack open");
      cy.get("#url").type("www.fullstackopen.com");
      cy.get("#create-blog").click();
      cy.contains("last-cypress");
      cy.wait(5000);
    });
    it("A blog can be liked", function () {
      cy.get("#blogs-information").click();
      cy.get("#like-blog").click();
      cy.contains("likes 1");
      cy.wait(2000);
    });
    it("A blog can be removed", function () {
      cy.get("#blogs-information").click();
      cy.get("#remove-blog").click();
      cy.get("html").should(
        "not.contain",
        "First class tests - Edsger W. Dijkstra"
      );
    });
  });

  describe("Blogs ordered by number of likes", function () {
    beforeEach(function () {
      const user = {
        username: "testing",
        password: "12345678",
      };
      cy.request("POST", "http://localhost:3001/api/login/", user)
        .then((res) => {
          localStorage.setItem("connectedUser", JSON.stringify(res.body));
          cy.visit("http://localhost:3000");
        })
        .then(() => {
          
          cy.request({
            url: "http://localhost:3001/api/blogs",
            method: "POST",
            body: {
              author: "John Doe",
              title: "test1",
              url: "http://example.com./test1",
            },
            headers: {
              Authorization: `bearer ${
                JSON.parse(localStorage.getItem("connectedUser")).token
              }`,
            },
          });
          cy.visit("http://localhost:3000");

          cy.request({
            url: "http://localhost:3001/api/blogs",
            method: "POST",
            body: {
              author: "John Doe",
              title: "test2",
              url: "http://example.com./test2",
            },
            headers: {
              Authorization: `bearer ${
                JSON.parse(localStorage.getItem("connectedUser")).token
              }`,
            },
          });
          cy.visit("http://localhost:3000");

          cy.request({
            url: "http://localhost:3001/api/blogs",
            method: "POST",
            body: {
              author: "John Doe",
              title: "test3",
              url: "http://example.com./test3",
            },
            headers: {
              Authorization: `bearer ${
                JSON.parse(localStorage.getItem("connectedUser")).token
              }`,
            },
          });
          cy.visit("http://localhost:3000");
        });

      cy.contains("test1").parent().parent().as("blog1");
      cy.contains("test2").parent().parent().as("blog2");
      cy.contains("test3").parent().parent().as("blog3");
    });

    it("they are ordered by number of likes", function () {
      cy.get("@blog1").contains("view").click();
      cy.get("@blog2").contains("view").click();
      cy.get("@blog3").contains("view").click();
      cy.get("@blog1").contains("like").as("like1");
      cy.get("@blog2").contains("like").as("like2");
      cy.get("@blog3").contains("like").as("like3");

      cy.get("@like2").click();
      cy.wait(500);
      cy.get("@like1").click();
      cy.wait(500);
      cy.get("@like1").click();
      cy.wait(500);
      cy.get("@like3").click();
      cy.wait(500);
      cy.get("@like3").click();
      cy.wait(500);
      cy.get("@like3").click();
      cy.wait(500);

      cy.get('.blogs').eq(0).should("contain", "6")
      cy.get('.blogs').eq(1)
      cy.get('.blogs').eq(2)
    });
  });
});
