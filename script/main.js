var g_foodEnergy = [];
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
    var searchResultArr = [];
    if (searchKey && searchKey.length) {
        searchResultArr = g_foodEnergy.filter(function(value){
            return value.name.includes(searchKey);
        });
    }
    
    showTable($(".table.search"), searchResultArr);
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
    data.forEach((foodItem)=>{
        bodyText += "<tr>" + generateName(foodItem) + "</tr>"
    });
    bodyText += "</tbody></table>";
    jQueryTableElement.html(bodyText);
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