async function getAllSupplier() {
    try {
        const response = await fetch('http://localhost:8080/api/suppliers');
        const suppliers = await response.json();

        var supplierTableBody = document.getElementById("supplierTableBody");
        supplierTableBody.innerHTML = "";

        const supplierPromises = suppliers.map(async(supplier) => {
            const itemsResponse = await fetch('http://localhost:8080/api/items/supplier?supplierId=' + supplier.id);
            const items = await itemsResponse.json();

            let totalPriceSupplier = 0;
            let quantitySupplier = 0;

            items.forEach(item => {
                totalPriceSupplier += item.totalPrice;
                quantitySupplier += item.quantity;
            });

            var row = "<tr>";
            row += "<td>" + supplier.id + "</td>";
            row += "<td>" + supplier.name + "</td>";
            row += "<td class='right'>" + quantitySupplier + "</td>";
            row += "<td class='right'>" + totalPriceSupplier + "</td>";
            row += "<td style='text-align: center;'><a href='supplierStatisticsDetail.html?supplierId=" + supplier.id + "'>Chi tiết</a></td>";
            row += "</tr>";

            supplierTableBody.innerHTML += row;
        });

        await Promise.all(supplierPromises);

    } catch (error) {
        console.error('Đã xảy ra lỗi khi gọi API: ', error);
    }
}

async function SearchSuppliers() {
    var keyword = document.getElementById("searchInput").value;
    try {
        const response = await fetch('http://localhost:8080/api/suppliers/search?keyword=' + keyword);
        const suppliers = await response.json();

        var supplierTableBody = document.getElementById("supplierTableBody");
        supplierTableBody.innerHTML = "";

        const supplierPromises = suppliers.map(async(supplier) => {
            const itemsResponse = await fetch('http://localhost:8080/api/items/supplier?supplierId=' + supplier.id);
            const items = await itemsResponse.json();

            let totalPriceSupplier = 0;
            let quantitySupplier = 0;

            items.forEach(item => {
                totalPriceSupplier += item.totalPrice;
                quantitySupplier += item.quantity;
            });

            var row = "<tr>";
            row += "<td>" + supplier.id + "</td>";
            row += "<td>" + supplier.name + "</td>";
            row += "<td class='right'>" + quantitySupplier + "</td>";
            row += "<td class='right'>" + totalPriceSupplier + "</td>";
            row += "<td style='text-align: center;'><a href='supplierStatisticsDetail.html?supplierId=" + supplier.id + "'>Chi tiết</a></td>";
            row += "</tr>";

            supplierTableBody.innerHTML += row;
        });

        await Promise.all(supplierPromises);

    } catch (error) {
        console.error('Đã xảy ra lỗi khi gọi API: ', error);
    }
}

function getAllItem(supplierName) {

    var sum = 0;

    fetch("http://localhost:8080/api/items/supplier?supplierName=" + supplierName)
        .then(response => response.json())
        .then(items => {

            var itemTableBody = document.getElementById("selectedProductTableBody");
            itemTableBody.innerHTML = "";
            items.forEach(item => {
                var row = "<tr>";
                row += "<td >" + item.id + "</td>";
                row += "<td>" + item.productName + "</td>";
                row += "<td class='right'>" + item.inPrice + "</td>";
                row += "<td class='right'>" + item.quantity + "</td>";
                row += "<td class='right'>" + item.inPrice * item.quantity + "</td>";
                row += "</tr>";
                itemTableBody.innerHTML += row;

                sum += item.inPrice * item.quantity;
            });
            displayTotal(sum);
        })
        .catch(error => console.error('Error fetching items:', error));
}

function displayTotal(sum) {
    const infoDiv = document.getElementById("total");
    infoDiv.textContent = sum;
}

function searchItems() {
    var sum = 0;
    var keyword = document.getElementById("searchInput").value;
    var supplierName = document.getElementById("supplierInfo").innerHTML;
    fetch("http://localhost:8080/api/items/searchSupplierNameAndKeyword?supplierName=" + supplierName + "&keyword=" + keyword)
        .then(response => response.json())
        .then(items => {
            var itemTableBody = document.getElementById("selectedProductTableBody");
            itemTableBody.innerHTML = "";
            items.forEach(item => {
                var row = "<tr>";
                row += "<td >" + item.id + "</td>";
                row += "<td>" + item.productName + "</td>";
                row += "<td class='right'>" + item.inPrice + "</td>";
                row += "<td class='right'>" + item.quantity + "</td>";
                row += "<td class='right'>" + item.inPrice * item.quantity + "</td>";
                row += "</tr>";
                itemTableBody.innerHTML += row;

                sum += item.inPrice * item.quantity;
            });
            displayTotal(sum);
        })
        .catch(error => console.error('Error searching products:', error));
}