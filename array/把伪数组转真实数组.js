console.log(Array.prototype.slice.call( document.querySelectorAll('li') )) //[li, li, li, li]
console.log(Array.from( document.querySelectorAll('li') )) //[li, li, li, li]