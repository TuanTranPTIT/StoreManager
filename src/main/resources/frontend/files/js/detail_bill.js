async function getBillDetail(id) {
    try {
        let response = await fetch("http://localhost:8080/api/bill?bill_id=" + id);
        let data = await response.json();

        try {
            let supplierResponse = await fetch('http://localhost:8080/api/supplier?id=' + data.supplierId);
            let supplierData = await supplierResponse.json();
            let supplierName = supplierData.name;

            document.getElementById('bill_id').textContent = id;
            document.getElementById('date').textContent = data.date;
            document.getElementById('supplierInfo').textContent = supplierName;
            document.getElementById('total_cost').textContent = data.totalCost;
        } catch (error) {
            console.error('Error fetching supplier details:', error);
        }
    } catch (error) {
        console.error('Error fetching bill details:', error);
    }
}


async function getAllItem(id) {
    try {
        let response = await fetch("http://localhost:8080/api/bill/get_item?billId=" + id);
        let items = await response.json();

        var itemTableBody = document.getElementById("itemTableBody");

        for (let item of items) {
            var row = "<tr>";

            try {
                let productResponse = await fetch('http://localhost:8080/api/product?id=' + item.productId);
                let productData = await productResponse.json();
                let nameItem = productData.name;

                row += "<td>" + item.id + "</td>";
                row += "<td>" + nameItem + "</td>";
                row += "<td class='right'>" + item.inPrice + "</td>";
                row += "<td class='right'>" + item.quantity + "</td>";
                row += "<td class='right'>" + item.inPrice * item.quantity + "</td>";
                row += "</tr>";

                itemTableBody.innerHTML += row;
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        }
    } catch (error) {
        console.error('Error fetching items:', error);
    }
}


function UpdateBill() {
    window.location.href = "update_bill.html?billId=" + document.getElementById("bill_id").textContent;
}