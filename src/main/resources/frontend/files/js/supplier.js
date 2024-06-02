//CreateSupplier

function CreateSupplier() {

    var name = document.getElementById("txtName").value;
    var address = document.getElementById("txtAddress").value;
    var phone = document.getElementById("txtPhone").value;
    var bank = document.getElementById("txtBank").value;
    var manager = document.getElementById("txtManager").value;

    if (name == "" || address == "" || phone == "" || bank == "" || manager == "") {
        alert('Vui lòng điền đầy đủ thông tin');
        return; // Dừng hàm nếu có lỗi
    }

    var raw = {
        "name": name,
        "address": address,
        "phone": phone,
        "bank": bank,
        "manager": manager
    };

    var requestOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(raw)
    };

    fetch('http://localhost:8080/api/supplier/create', requestOptions)
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert(data.message);
            } else {
                alert('Thêm nhà cung cấp thành công!');
            }
        })
        .catch(error => {
            alert(error.message);
        });
}

//GetSuppliers
function GetSuppliers() {
    fetch('http://localhost:8080/api/suppliers')
        .then(response => response.json())
        .then(data => {
            const danhsachChitiet = document.querySelector('.danhsach-chitiet');
            danhsachChitiet.innerHTML = ''; // Xóa nội dung hiện tại của danh sách

            // Duyệt qua mỗi nhà cung cấp và thêm vào danh sách
            data.forEach(item => {
                const li = document.createElement('ul');
                li.classList.add('danhsach-item');
                li.innerHTML = `
                    <li style="width:60px;">${item.id}</li>
                    <li style="width:200px;">${item.name}</li>
                    <li style="width:200px;">${item.address}</li>
                    <li style="width:200px;">${item.phone}</li>
                    <li style="width:250px;">${item.bank}</li>
                    <li style="width:200px;">${item.manager}</li>
                    <li style="width:150px; float:right; text-align:right;">
                        <a class="lnkSua" name="btnSua${item.id}" data-id="${item.id}" title="Sửa tài khoản" href="updateSupplier.html?id=${item.id}">Sửa</a>
                        <a class="lnkXoa" name="btnXoa${item.id}" data-id="${item.id}" title="Xoá tài khoản" onclick="DeleteSupplier(${item.id})">Xoá</a>
                    </li>
                `;
                danhsachChitiet.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}

//GetSupplierById
function GetSupplierById(id) {
    fetch('http://localhost:8080/api/supplier?id=' + id)
        .then(response => response.json())
        .then(data => {
            document.getElementById('pId').textContent = data.id;
            document.getElementById('txtName').value = data.name;
            document.getElementById('txtAddress').value = data.address;
            document.getElementById('txtPhone').value = data.phone;
            document.getElementById('txtBank').value = data.bank;
            document.getElementById('txtManager').value = data.manager;
        })
        .catch(error => console.error('Error:', error));
}

//UpdateSupplier
function UpdateSupplier() {

    var id = document.getElementById('pId').textContent;
    var name = document.getElementById("txtName").value;
    var address = document.getElementById("txtAddress").value;
    var phone = document.getElementById("txtPhone").value;
    var bank = document.getElementById("txtBank").value;
    var manager = document.getElementById("txtManager").value;

    var raw = {
        "id": id,
        "name": name,
        "address": address,
        "phone": phone,
        "bank": bank,
        "manager": manager
    };

    var requestOptions = {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(raw)
    };

    fetch('http://localhost:8080/api/supplier/update', requestOptions)
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert(data.message);
            } else {
                alert('Sửa nhà cung cấp thành công!');
            }
        })
        .catch(error => {
            alert('Sửa nhà cung cấp thành công!');
        });
}

//DeleteSupplier
function DeleteSupplier(id) {
    // Hỏi người dùng xác nhận trước khi xóa
    const confirmation = confirm("Bạn có muốn xóa nhà cung cấp có ID " + id + " không?");

    if (!confirmation) {
        console.log("Hủy bỏ xóa nhà cung cấp.");
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

    fetch('http://localhost:8080/api/supplier/delete?id=' + id, requestOptions)
        .then((response) => response.text())
        .then((result) => {
            alert("Nhà cung cấp có ID " + id + " đã được xóa thành công.");
            location.reload();
        })
        .catch((error) => console.error(error));
}

//SubmitSearch
function submitSearch() {
    const keyword = document.getElementById('txtSearch').value; // Lấy từ khoá tìm kiếm từ input

    // Gọi hàm tìm kiếm với từ khoá đã nhập
    SearchSuppliers(keyword);
}

//SearchSuppliers
function SearchSuppliers(keyword) {
    fetch('http://localhost:8080/api/suppliers/search?keyword=' + keyword)
        .then(response => response.json())
        .then(data => {
            const danhsachChitiet = document.querySelector('.danhsach-chitiet');
            danhsachChitiet.innerHTML = ''; // Xóa nội dung hiện tại của danh sách

            // Duyệt qua mỗi nhà cung cấp và thêm vào danh sách
            data.forEach(item => {
                const li = document.createElement('ul');
                li.classList.add('danhsach-item');
                li.innerHTML = `
                    <li style="width:60px;">${item.id}</li>
                    <li style="width:200px;">${item.name}</li>
                    <li style="width:200px;">${item.address}</li>
                    <li style="width:200px;">${item.phone}</li>
                    <li style="width:250px;">${item.bank}</li>
                    <li style="width:200px;">${item.manager}</li>
                    <li style="width:150px; float:right; text-align:right;">
                        <a class="lnkSua" name="btnSua${item.id}" data-id="${item.id}" title="Sửa tài khoản" href="updateSupplier.html?id=${item.id}">Sửa</a>
                        <a class="lnkXoa" name="btnXoa${item.id}" data-id="${item.id}" title="Xoá tài khoản" onclick="DeleteSupplier(${item.id})">Xoá</a>
                    </li>
                `;
                danhsachChitiet.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}

function validatePhoneNumber(phoneNumber) {
    // Biểu thức chính quy kiểm tra số điện thoại
    var phoneRegex = /^\d{10}$/;

    // Kiểm tra xem số điện thoại có khớp với biểu thức chính quy hay không
    return phoneRegex.test(phoneNumber);
}
2321