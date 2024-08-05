import fs from "fs";
import { parseDocument } from "htmlparser2";
import { getElementsByTagName } from "domutils/lib/legacy";
import { textContent } from "domutils/lib/stringify";
import { findOne, findAll } from "domutils/lib/querying";

const html = fs.readFileSync('./src/index.html',
    { encoding: 'utf8', flag: 'r' });

const dom = parseDocument(html);

function checkPropertyCSS(prop1, prop2) {
	const styles = getElementsByTagName("style", dom)[0];
  const styleContent = textContent(styles.children);
  
  let checkProp = false;

	if (styleContent.includes(prop1)) {
	  checkProp = true;
	} else if (styleContent.includes(prop2)){
	  checkProp = true;
	} else {
	  checkProp = false;
	}

	return checkProp;
}

it("check length of div card inside main", function(){
  const element = findOne(elem => elem.attribs.class === "main", dom.children);
  const items = findAll(elem => elem.attribs.class === "card", element.children);
  expect(items.length).toBe(3);
})

it("check length of img", function(){
  const images = getElementsByTagName("img", dom);
	expect(images.length).toBe(3);
})

it("check length of span", function(){
  const span = getElementsByTagName("span", dom);
	expect(span.length).toBe(3);
})

it("check button content", function(){
  const buttons = getElementsByTagName("button", dom);

	if (buttons.length > 0) {
    buttons.forEach((button) => expect(textContent(button).toLowerCase()).toBe("view recipe"));
	} else {
	  expect(buttons.length).toBe(3);
	}
})

it("check img 1 src url", function(){
  const image = getElementsByTagName("img", dom)[0];
  const url = "http://tiny.cc/spaghettircpbk";
  expect(image.attribs.src).toBe(url);
})

it("check img 2 src url", function(){
  const image = getElementsByTagName("img", dom)[1];
  const url = "http://tiny.cc/lasagnarcpbk";
  expect(image.attribs.src).toBe(url);
})

it("check img 3 src url", function(){
  const image = getElementsByTagName("img", dom)[2];
  const url = "http://tiny.cc/pizzarcpbk";
  expect(image.attribs.src).toBe(url);
})

it("check span 1 content", function(){
  const span = getElementsByTagName("span", dom)[0];
	const spanText = textContent(span);
  expect(spanText.toLowerCase()).toBe("spaghetti");
})

it("check span 2 content", function(){
  const span = getElementsByTagName("span", dom)[1];
	const spanText = textContent(span);
  expect(spanText.toLowerCase()).toBe("lasagna");
})

it("check span 3 content", function(){
  const span = getElementsByTagName("span", dom)[2];
  const spanText = textContent(span);
  expect(spanText.toLowerCase()).toBe("pizza");
})

it("check color of h1", function(){
  const checkProp = checkPropertyCSS("color: #fb544b6", "color:#fb544b6");
  expect(checkProp).toBeTruthy();
})

it("check font weight of title", function(){
	const checkProp = checkPropertyCSS("font-weight: bold", "font-weight:bold");
  expect(checkProp).toBeTruthy();
})

it("check font size of title", function(){
 	const checkProp = checkPropertyCSS("font-size: 18px", "font-size:18px");
  expect(checkProp).toBeTruthy();
})

it("check image height", function(){
  const checkProp = checkPropertyCSS("height: 100px", "height:100px");
  expect(checkProp).toBeTruthy();
})

it("check button background color", function(){
  const checkProp = checkPropertyCSS("background-color: #fb544b", "background-color:#fb544b");
  expect(checkProp).toBeTruthy();
})