const Desktop = {
	data() {
		return {
			page3ScreenshotURLs: [
				'screenshots/screenshot_page_3_1.png',
				'screenshots/screenshot_page_3_2.png',
				'screenshots/screenshot_page_3_3.png'
			],
			page2ScreenshotURLs: [
				'screenshots/screenshot_page_2_1.png',
				'screenshots/screenshot_page_2_2.png',
				'screenshots/screenshot_page_2_4.png'
			]
		}
	}
}

const desktop = Vue.createApp(Desktop)
desktop.component('page-3-window', {
	props: ['url'],
	template: `
<div class="outter_page_3 outter">
    <div class="inner_page_3 inner">
        <img v-bind:src="url" class="screenshot_page_3_img screenshot item" />
    </div>
</div>
`
})
desktop.component('page-2-window', {
	props: ['url'],
	template: `
<div class="outter_page_2 outter">
    <div class="inner_page_2 inner"> 
        <img v-bind:src="url" class="screenshot_page_2_img screenshot item" />
    </div>
</div>
`
})
desktop.mount('body')