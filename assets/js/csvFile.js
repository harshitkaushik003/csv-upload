// parsing the data recevied from csvFile.ejs file 
let parsedData = JSON.parse(csvData);

//fetching the elements from DOM
let search = document.getElementById('search');
let btn = document.getElementById('btn');
let dataDiv = document.getElementById('dataDiv');


var value = '';
var searchData = parsedData;

btn.addEventListener('click', function(){
    
    value = search.value;
    searchData = []; //will contain the records to be displayed

    //filling the searchData array on the basis of value
    parsedData.forEach(item => {
        Object.keys(item).forEach(key => {
            if (item[key] === value) {
                searchData.push(item);
            }
        });
    });
    
    //rendering the data on the dom
    dataDiv.innerHTML = searchData.map(element => {
        return `<p>${Object.keys(element).map(key => `<span>${element[key]}</span>`).join('')}</p>`;
    }).join('');
})

//if the search input is empty display all the records
search.addEventListener('input', function() {
    value = search.value;
    if(value === ''){
        searchData = parsedData;
    }
    dataDiv.innerHTML = searchData.map(element => {
    return `<p>${Object.keys(element).map(key => `<span>${element[key]}</span>`).join('')}</p>`;
    }).join('');
});

