import common from "./pages/commonSelectors.js";
fixture`Udemy`.page`https://www.udemy.com/courses/search/?src=ukw&q=webdriver+io`.skipJsErrors();
//fixture`Udemy`.page`https://www.udemy.com/`.skipJsErrors();

test.meta({ testid: 'TC01', type: 'Regression' })('To verify course link should be broken or not', async t => {
    await t.maximizeWindow()
    // .expect(common.searchbox.exists).ok()
    // .click(common.searchbox)
    // .typeText(common.searchbox,'Webdriver Io', {paste:true})
    //.pressKey('enter')
    if(await common.alertBox.exists){
        await t.click(common.cookieRejectButton)
    }
   await t.expect(common.sideFilter.exists).ok().wait(3000)
    const ratingText = await common.rating.textContent
    await t.expect(ratingText).contains('4.5')
    await t.wait(3000)
    await t.click(common.rating).wait(3000)
   await t .expect(common.links.exists).ok()     
   await common.copyAndCompareLinks(t)
  await common.verifyAllLinks(t,1)
   await t.click(common.soryByContainer)
   const sort = common.soryByContainer
   const sortOption = sort.find('option')
   await t.click(sortOption.withText('Highest Rated'))
   await t .expect(common.links.exists).ok() 
const courseCount = await common.courseCard.count
for(let i = 0; i< courseCount; i++){
    const text = await common.courseCard.nth(i).textContent
    if(await t.expect(text).contains('Highest Rated')){
        console.log('Course '+ i +' is not mentioned as Highest Rated')
    }else{
        console.log('Course '+ i +' is not mentioned as Highest Rated')
    }
}
})