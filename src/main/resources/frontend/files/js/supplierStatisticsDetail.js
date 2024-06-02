var supplierId;
async function GetSupplierById(id) {
    supplierId = id;
    try {
        const supplierResponse = await fetch("http://localhost:8080/api/supplier?id=" + id);
        const supplierData = await supplierResponse.json();
        const nameSupplier = supplierData.name;
        document.getElementById("supplierInfo").innerHTML = nameSupplier;
    } catch (productError) {
        console.error('Error fetching product:', productError);
    }
}

async function GetBySupplierId(id) {
    var sum = 0;
    try {
        const response = await fetch("http://localhost:8080/api/items/supplier?supplierId=" + id);
        const items = await response.json();

        var itemTableBody = document.getElementById("selectedProductTableBody");
        itemTableBody.innerHTML = "";

        for (const item of items) {
            try {
                const productResponse = await fetch("http://localhost:8080/api/product?id=" + item.productId);
                const productData = await productResponse.json();
                const nameItem = productData.name;

                var row = "<tr>";
                row += "<td>" + item.id + "</td>";
                row += "<td>" + nameItem + "</td>";
                row += "<td class='right'>" + item.inPrice + "</td>";
                row += "<td class='right'>" + item.quantity + "</td>";
                row += "<td class='right'>" + (item.inPrice * item.quantity) + "</td>";
                row += "</tr>";
                itemTableBody.innerHTML += row;

                sum += item.inPrice * item.quantity;
            } catch (productError) {
                console.error('Error fetching product:', productError);
            }
        }

        displayTotal(sum);
    } catch (error) {
        console.error('Error fetching items:', error);
    }
}

async function searchItems() {
    var sum = 0;
    var keyword = document.getElementById("searchInput").value;
    try {
        const response = await fetch("http://localhost:8080/api/items/searchSupplierAndKeyword?supplierId=" + supplierId + "&keyword=" + keyword);
        const items = await response.json();

        var itemTableBody = document.getElementById("selectedProductTableBody");
        itemTableBody.innerHTML = "";

        for (const item of items) {
            try {
                const productResponse = await fetch("http://localhost:8080/api/product?id=" + item.productId);
                const productData = await productResponse.json();
                const nameItem = productData.name;

                var row = "<tr>";
                row += "<td>" + item.id + "</td>";
                row += "<td>" + nameItem + "</td>";
                row += "<td class='right'>" + item.inPrice + "</td>";
                row += "<td class='right'>" + item.quantity + "</td>";
                row += "<td class='right'>" + (item.inPrice * item.quantity) + "</td>";
                row += "</tr>";
                itemTableBody.innerHTML += row;

                sum += item.inPrice * item.quantity;
            } catch (productError) {
                console.error('Error fetching product:', productError);
            }
        }

        displayTotal(sum);
    } catch (error) {
        console.error('Error fetching items:', error);
    }
}

function displayTotal(sum) {
    const infoDiv = document.getElementById("total");
    infoDiv.textContent = sum;
}