var g_foodEnergy = [];
var g_searchResult = [];
var g_todayFood = [];
var g_summary = {
    calo: 0,
    cabs: 0,
    fat: 0,
    protein: 0
}
$.get("food.json", (data)=> {
    g_foodEnergy = data;
    showTable($(".table.list"), data);
    $(".table.list").hide();
})

$(".show-list").on("click", ()=> {
    $(".table.list").toggle();
})

$("#search").on("input", function() {
    var searchKey = $(this).val();
    var g_searchResult = [];
    if (searchKey && searchKey.length) {
        g_searchResult = g_foodEnergy.filter(function(value){
            return value.name.includes(searchKey);
        });
    }
    
    showTable($(".table.search"), g_searchResult);
})



function showTable (jQueryTableElement, data) {
    var bodyText = `<table><thead><tr>
                    <th>Tên thức ăn</th>
                    <th>Calo</th>
                    <th>Cabs</th>
                    <th>Fat</th>
                    <th>Protein</th>
                    <th>Unit</th>
                    <th>Note</th>
                    </tr></thead><tbody>`;
    data.forEach((foodItem, index)=>{
        bodyText += `<tr id="${index}">${generateName(foodItem)}</tr>`
    });
    bodyText += "</tbody></table>";
    jQueryTableElement.html(bodyText);
    jQueryTableElement.find("tr").off("click");
    jQueryTableElement.find("tr").on("click", chooseFood);

}

function showTodayTable (jQueryTableElement, data) {
    var bodyText = `<table><thead><tr>
                    <th>Tên thức ăn</th>
                    <th>Calo</th>
                    <th>Cabs</th>
                    <th>Fat</th>
                    <th>Protein</th>
                    <th>Unit</th>
                    <th>So luong</th>
                    </tr></thead><tbody>`;
    data.forEach((foodItem, index)=>{
        bodyText += `<tr id="${index}">${generateTodayName(foodItem)}</tr>`;
        g_summary.calo += parseInt(foodItem.calo) ;
        g_summary.cabs += parseInt(foodItem.cabs);
        g_summary.fat += parseInt(foodItem.fat) ;
        g_summary.protein += parseInt(foodItem.protein) ;
    });
    bodyText += generateSummary(g_summary);
    bodyText += "</tbody></table>";
    jQueryTableElement.html(bodyText);
    jQueryTableElement.find("tr").off("click");
    jQueryTableElement.find("tr").on("click", chooseFood);

}


function chooseFood (event) {
    console.log("choose food", event);
    console.log($(this));
    var itemElem = $(this);
    var newItem = {
        name: itemElem[0].children[0].innerText,
        calo: itemElem[0].children[1].innerText,
        cabs: itemElem[0].children[2].innerText,
        fat: itemElem[0].children[3].innerText,
        protein: itemElem[0].children[4].innerText,
        unit: itemElem[0].children[5].innerText,
        amount: 1
    }
    // console.log(newItem);
    g_todayFood.push(newItem);
    showTodayTable($(".table.food"), g_todayFood)
}

function generateName (item) {
    return `<td>  ${item.name}  </td>
            <td>  ${item.calo} </td>
            <td>  ${item.cabs} </td>
            <td>  ${item.fat} </td>
            <td>  ${item.protein} </td>
            <td>  ${item.unit} </td>
            <td>  ${item.note} </td>`;
}

function generateTodayName (item) {
    return `<td>  ${item.name}  </td>
            <td>  ${item.calo} </td>
            <td>  ${item.cabs} </td>
            <td>  ${item.fat} </td>
            <td>  ${item.protein} </td>
            <td>  ${item.unit} </td>
            <td>  ${item.amount} </td>`;
}

function generateSummary (item) {
    return `<td><b>Summary</b>    </td>
            <td id="summary"><b>  ${item.calo} </b></td>
            <td><b>  ${item.cabs} </b></td>
            <td><b>  ${item.fat} </b></td>
            <td><b>  ${item.protein} </b></td>
            <td>   </td>
            <td>   </td>`;
}