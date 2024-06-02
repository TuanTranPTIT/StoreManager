function getAllSupplier() {
    fetch('http://localhost:8080/api/suppliers')
        .then(response => response.json())
        .then(data => {
            const searchInput = document.getElementById('searchInputSupplier');
            const dropdownContent = document.getElementById('supplierDropdown');

            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                const filteredSuppliers = data.filter(supplier => supplier.name.toLowerCase().includes(searchTerm));
                displaySupplierOptions(filteredSuppliers);
            });

            // Hide dropdown when click outside
            document.addEventListener('click', function(event) {
                if (!dropdownContent.contains(event.target) && event.target !== searchInput) {
                    dropdownContent.style.display = 'none';
                }
            });
        })
        .catch(error => {
            console.error('Đã xảy ra lỗi khi gọi API: ', error);
        });
}

function displaySupplierOptions(suppliers) {
    const dropdownContent = document.getElementById('supplierDropdown');
    dropdownContent.innerHTML = '';

    suppliers.forEach(supplier => {
        const option = document.createElement('div'); // Tạo một div thay vì một option
        option.classList.add('dropdown-option'); // Thêm class cho div để tạo giao diện dropdown
        option.textContent = supplier.name;
        option.addEventListener('click', function() {
            // Hiển thị thông tin nhà cung cấp đã chọn
            displaySupplierInfo(supplier);
            // Tự động thêm tên nhà cung cấp vào ô input tìm kiếm
            document.getElementById('searchInputSupplier').value = supplier.name;
            // Ẩn dropdown sau khi chọn một tùy chọn
            dropdownContent.style.display = 'none';
        });
        dropdownContent.appendChild(option);
    });

    dropdownContent.style.display = 'block';
}

function displaySupplierInfo(supplier) {
    const infoDiv = document.getElementById("supplierInfo");
    infoDiv.textContent = supplier.name
}

// Gọi hàm getAllSupplier khi trang được tải
window.onload = getAllSupplier;

// JavaScript
var selectedProducts = [];

function selectProduct(id, name, image) {
    // Check if the product is already selected
    var isAlreadySelected = selectedProducts.some(product => product.id === id);
    if (!isAlreadySelected) {
        // Add selected product to the selectedProducts array
        selectedProducts.push({
            id,
            name,
            image
        });

        // Add the selected product row to the selectedProductTable
        var selectedProductTableBody = document.getElementById("selectedProductTableBody");
        var row = "<tr id='selectedProductRow_" + id + "'>";
        row += "<td>" + id + "</td>";
        row += "<td>" + name + "</td>";
        row += "<td class='center'><img src='" + image + "' alt='Product Image' style='width: 50px; height: 50px;'></td>";
        row += "<td class='right'><input class='right' type='number' id='price_" + id + "' placeholder='Price'></td>";
        row += "<td class='right'><input class='right' type='number' id='quantity_" + id + "' placeholder='Quantity'></td>";
        row += "<td><button onclick='removeProduct(" + id + ")'>Xoá</button></td>";
        row += "</tr>";
        selectedProductTableBody.innerHTML += row;
    }
}

function removeProduct(id) {
    // Remove the selected product from the selectedProducts array
    selectedProducts = selectedProducts.filter(product => product.id !== id);

    // Remove the selected product row from the selectedProductTable
    var selectedProductRow = document.getElementById("selectedProductRow_" + id);
    selectedProductRow.remove();
}

async function saveSelectedItems() {
    var supplierName = document.getElementById("supplierInfo").textContent;
    if (supplierName === "") {
        alert('Vui lòng chọn nhà cung cấp!');
        return;
    }

    try {
        // Fetch supplier ID
        let supplierResponse = await fetch('http://localhost:8080/api/supplier/name?name=' + supplierName);
        let supplierData = await supplierResponse.json();
        let supplierId = supplierData.id;

        var itemsToSave = [];
        var ok = 0;

        // Create an array of promises to fetch product IDs and validate inputs
        let productPromises = selectedProducts.map(async(product) => {
            try {
                let productResponse = await fetch('http://localhost:8080/api/product/name?product_name=' + product.name);
                let productData = await productResponse.json();
                let productId = productData.id;

                var quantity = document.getElementById("quantity_" + product.id).value;
                var price = document.getElementById("price_" + product.id).value;

                if (quantity === "" || price === "") {
                    alert('Vui lòng nhập đầy đủ thông tin sản phẩm!');
                    ok = 1;
                    return;
                }
                if (quantity <= 0 || price <= 0) {
                    alert('Vui lòng nhập số dương!');
                    ok = 1;
                    return;
                }

                itemsToSave.push({
                    productId: productId,
                    inPrice: parseFloat(price),
                    quantity: parseInt(quantity),
                    totalPrice: parseFloat(price) * parseInt(quantity),
                    supplierId: supplierId
                });
            } catch (error) {
                console.error('Error fetching product ID:', error);
                ok = 1;
            }
        });

        // Await all product promises to complete
        await Promise.all(productPromises);

        if (ok === 1) return;
        if (itemsToSave.length === 0) {
            alert('Vui lòng chọn sản phẩm!');
            return;
        }

        var dataToSend = {
            itemsToSave: itemsToSave,
            supplierName: supplierName
        };

        // Send the final data
        let saveResponse = await fetch('http://localhost:8080/api/bill/save_selected', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        });

        if (saveResponse.ok) {
            alert('Selected items have been saved successfully.');
            window.location.href = "bill.html";
        } else {
            alert('Failed to save selected items.');
        }

    } catch (error) {
        console.error('Error:', error);
    }
}



function searchProducts() {
    var keyword = document.getElementById("searchInput").value;
    fetch("http://localhost:8080/api/products/search?keyword=" + keyword)
        .then(response => response.json())
        .then(products => {
            var productTableBody = document.getElementById("productTableBody");
            productTableBody.innerHTML = ""; // Clear existing rows
            products.forEach(product => {
                var row = "<tr>";
                row += "<td>" + product.id + "</td>";
                row += "<td>" + product.name + "</td>";
                row += "<td class='center'><img src='" + product.image + "' alt='Product Image' style='width: 50px; height: 50px;'></td>";
                row += "<td>" + product.des + "</td>";
                row += "<td  class='center' style='text-align: right;'>" + product.outPrice + " đ" + "</td>";
                row += "<td  class='center' style='text-align: right;'>" + product.quantity + "</td>";
                row += "<td  class='center'><button onclick='selectProduct(" + product.id + ", \"" + product.name + "\", \"" + product.image + "\")'>Chọn</button></td>";
                row += "</tr>";
                productTableBody.innerHTML += row;
            });
        })
        .catch(error => console.error('Error searching products:', error));
}

fetch("http://localhost:8080/api/products")
    .then(response => response.json())
    .then(products => {
        var productTableBody = document.getElementById("productTableBody");
        products.forEach(product => {
            var row = "<tr>";
            row += "<td>" + product.id + "</td>";
            row += "<td>" + product.name + "</td>";
            row += "<td class='center'><img src='" + product.image + "' alt='Product Image' style='width: 50px; height: 50px;'></td>";
            row += "<td>" + product.des + "</td>";
            row += "<td class='center' style='text-align: right;'>" + product.outPrice + " đ" + "</td>";
            row += "<td class='center' style='text-align: right;'>" + product.quantity + "</td>";
            row += "<td class='center' ><button onclick='selectProduct(" + product.id + ", \"" + product.name + "\", \"" + product.image + "\")'>Chọn</button></td>";
            row += "</tr>";
            productTableBody.innerHTML += row;
        });
    })
    .catch(error => console.error('Error fetching products:', error));

function DeleteBill(id) {
    // Hỏi người dùng xác nhận trước khi xóa
    const confirmation = confirm("Bạn có muốn xóa Bill có ID " + id + " không?");

    if (!confirmation) {
        console.log("Hủy bỏ xóa Bill.");
        return; // Không thực hiện xóa nếu người dùng hủy bỏ
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("id", id);

    const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow"
    };

    fetch('http://localhost:8080/api/bill/delete?billId=' + id, requestOptions)
        .then((response) => response.text())
        .then((result) => {
            alert("Bill có ID " + id + " đã được xóa thành công.");
            location.reload();
        })
        .catch((error) => console.error(error));
}