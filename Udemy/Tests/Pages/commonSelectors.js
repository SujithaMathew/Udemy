import { Selector } from 'testcafe';
import fs from 'fs'
async function copyAndCompareLinks(t) {
    const linkCount = this.links.count
    console.log(linkCount)
    for (let i = 0; i < linkCount; i++) {
        let linkText = await this.links.nth(i).getAttribute('href')
        fs.writeFile('links.txt', linkText, (err) => {
            if (err) throw err;
        })
        fs.readFile('links.txt', (err, inputData) => {
            if (err) throw err;
            const textData = inputData.toString()
            if (linkText === textData) {
                console.log('Result page link text is --' + linkText + ' -- matched with text file link --' + textData)
            } else {
                console.log('Result page link text is not --' + linkText + ' -- matched with text file link --' + textData)
            }
        })
    }
}
async function verifyAllLinks(t, check_for_404) {
    const linkCount = this.links.count
    for (let i = 0; i < linkCount; i++) {
        test(this.links.nth(i), async t => {
            await t.navigateTo(this.links.nth(i))
            if (check_for_404 == 0) { }
            else {
                await this.checkNoPageNotFound(t)
            }
        })
    }
}
async function checkNoPageNotFound(t) {
    return t.expect(Selector('html').textContent).notContains('Page not found')
}

export default {
    alertBox: Selector('div[role="alertdialog"]'),
    cookieRejectButton: Selector('#onetrust-reject-all-handler').withText('Reject all'),
    searchbox: Selector('input[name="q"]'),
    sideFilter: Selector('#filter-form'),
    rating: Selector('.ud-toggle-input-container').nth(0),
    links: Selector('.course-list--container--3zXPS .popper--popper--1zOlT h3 a'),
    ratingTitle: Selector('.ud-accordion-panel-title').withText('Ratings'),
    soryByContainer: Selector('.ud-select-container select'),
    courseCard: Selector('.course-card--main-content--2XqiY'),
    copyAndCompareLinks,
    checkNoPageNotFound,
    verifyAllLinks
}
