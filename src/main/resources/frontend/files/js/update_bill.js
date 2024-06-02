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
var selectedItems = [];

function selectProduct(id, name, image) {
    // Check if the product is already selected
    var isAlreadySelectedProducts = selectedProducts.some(product => product.id === id);
    var isAlreadySelectedItems = selectedItems.some(item => item.nameItem === name);
    if (!isAlreadySelectedProducts && !isAlreadySelectedItems) {
        // Add selected product to the selectedProducts array
        selectedProducts.push({
            id,
            name,
            image
        });

        // Add the selected product row to the selectedProductTable
        var selectedProductTableBody = document.getElementById("selectedProductTableBody");
        var row = "<tr id='selectedProductRow_" + id + "'>";
        row += "<td>" + "" + "</td>";
        row += "<td>" + name + "</td>";
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

async function saveChanges() {
    var supplierName = document.getElementById("supplierInfo").textContent;
    var bill_id = document.getElementById("bill_id").textContent;
    if (supplierName == "") {
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

        var itemElements = document.querySelectorAll("#itemTableBody tr"); // Lấy tất cả các hàng trong bảng

        for (let row of itemElements) {
            var idElement = row.querySelector("td:nth-child(1)");
            var productNameElement = row.querySelector("td:nth-child(2)");
            var priceElement = row.querySelector("input[type='number'][id^='price_']");
            var quantityElement = row.querySelector("input[type='number'][id^='quantity_']");

            // Kiểm tra các phần tử có tồn tại không
            if (idElement != null) {
                if (idElement && productNameElement && quantityElement && priceElement) {
                    var id = idElement.textContent;
                    var productName = productNameElement.textContent;
                    var quantity = quantityElement.value;
                    var price = priceElement.value;

                    // Fetch product ID
                    let productResponse = await fetch('http://localhost:8080/api/product/name?product_name=' + productName);
                    let productData = await productResponse.json();
                    let productId = productData.id;

                    if (quantity == "" || price == "") {
                        alert('Vui lòng nhập đầy đủ thông tin sản phẩm!');
                        ok = 1;
                        break;
                    }
                    if (quantity <= 0 || price <= 0) {
                        alert('Vui lòng nhập số dương!');
                        ok = 1;
                        break;
                    }

                    itemsToSave.push({
                        id: id,
                        billId: bill_id,
                        productId: productId,
                        quantity: parseInt(quantity),
                        inPrice: parseFloat(price),
                        totalPrice: parseFloat(price) * parseInt(quantity),
                        supplierId: supplierId
                    });
                } else {
                    console.error("One or more elements are missing.");
                }
            }
        }

        if (ok == 1) return;
        if (itemsToSave.length == 0) {
            alert('Vui lòng chọn sản phẩm!');
            return;
        }

        var dataToSend = {
            itemsToSave: itemsToSave,
            supplierName: supplierName
        };

        var xhr = new XMLHttpRequest();
        xhr.open("PUT", "http://localhost:8080/api/bill/update", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    alert('Đơn nhập đã được sửa thành công!');
                    window.location.href = 'detail_bill.html?billId=' + bill_id;
                } else {
                    alert('Đã có lỗi xảy ra, vui lòng thử lại!');
                }
            }
        };
        xhr.send(JSON.stringify(dataToSend));
    } catch (error) {
        console.error(error);
    }
}


async function getBillDetail(id) {
    try {
        let response = await fetch("http://localhost:8080/api/bill?bill_id=" + id);
        let data = await response.json();

        try {
            let supplierResponse = await fetch('http://localhost:8080/api/supplier?id=' + data.supplierId);
            let supplierData = await supplierResponse.json();
            let supplierName = supplierData.name;

            document.getElementById('bill_id').textContent = id;
            document.getElementById('searchInputSupplier').value = supplierName;
            document.getElementById('supplierInfo').textContent = supplierName;
        } catch (error) {
            console.error('Error fetching supplier details:', error);
        }
    } catch (error) {
        console.error('Error fetching bill details:', error);
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

function getAllProducts() {
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
}

async function getAllItem(id) {
    try {
        let response = await fetch("http://localhost:8080/api/bill/get_item?billId=" + id);
        let items = await response.json();

        var itemTableBody = document.getElementById("itemTableBody");

        for (let item of items) {
            try {
                let productResponse = await fetch('http://localhost:8080/api/product?id=' + item.productId);
                let productData = await productResponse.json();
                let nameItem = productData.name;

                selectedItems.push({
                    nameItem
                });

                var row = "<tr id='selectedProductRow_" + item.id + "'>";
                row += "<td>" + item.id + "</td>";
                row += "<td>" + nameItem + "</td>"; // Use the fetched product name
                row += "<td style='text-align: right'><input style='text-align: right' type='number' id='price_" + item.id + "' value='" + item.inPrice + "' placeholder='InPrice'></td>";
                row += "<td style='text-align: right'><input style='text-align: right' type='number' id='quantity_" + item.id + "' value='" + item.quantity + "' placeholder='Quantity'></td>";
                row += "<td><button onclick='removeProduct(" + item.id + ")'>Xoá</button></td>";
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