/// <reference types="cypress" />

Cypress.Commands.add('login', (user, pass) => {
    const fd = new FormData()

    fd.append('log', user)
    fd.append('pwd', pass)
    fd.append('wp-submit', 'Acessar')
    fd.append('redirect_to', `/wp-admin`)
    fd.append('testcookie', 1)

    cy.request({
        url: `/wp-login.php`,
        method: "POST",
        body: fd
    }).then((resp) => {
        resp.headers['set-cookie'].forEach(cookie => {
            const firstPart = cookie.split(';')[0]
            const separator = firstPart.indexOf('=')
            const name = firstPart.substring(0, separator)
            const value = firstPart.substring(separator + 1)
            cy.setCookie(name, value)
        })
    })
    
    cy.visit("/wp-admin")
})
