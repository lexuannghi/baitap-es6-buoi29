class Person {
  constructor(name, address, code, email) {
    this.name = name;
    this.address = address;
    this.code = code;
    this.email = email;
  }

  displayInfo() {
    return `${this.name} - ${this.code}`;
  }
}

class Student extends Person {
  constructor(name, address, code, email, math, physics, chemistry) {
    super(name, address, code, email);
    this.math = math;
    this.physics = physics;
    this.chemistry = chemistry;
  }

  calculateAverage() {
    return (this.math + this.physics + this.chemistry) / 3;
  }

  displayInfo() {
    return `${super.displayInfo()} - Điểm TB: ${this.calculateAverage()}`;
  }
}

class Employee extends Person {
  constructor(name, address, code, email, workDays, dailySalary) {
    super(name, address, code, email);
    this.workDays = workDays;
    this.dailySalary = dailySalary;
  }

  calculateSalary() {
    return this.workDays * this.dailySalary;
  }

  displayInfo() {
    return `${super.displayInfo()} - Lương: ${this.calculateSalary()}`;
  }
}

class Customer extends Person {
  constructor(name, address, code, email, companyName, invoiceValue, rating) {
    super(name, address, code, email);
    this.companyName = companyName;
    this.invoiceValue = invoiceValue;
    this.rating = rating;
  }

  displayInfo() {
    return `${super.displayInfo()} - Công ty: ${this.companyName} - Hóa đơn: ${
      this.invoiceValue
    } - Đánh giá: ${this.rating}`;
  }
}

class Manager extends Person {
  constructor(name, address, code, email) {
    super(name, address, code, email);
  }

  updatePersonInfo(personList, code, updatedInfo) {
    const personIndex = personList.findIndex((person) => person.code === code);
    if (personIndex !== -1) {
      personList[personIndex] = { ...personList[personIndex], ...updatedInfo };
    }
  }

  displayInfo() {
    return `${super.displayInfo()} - Quản lý`;
  }
}

class ListPerson {
  constructor() {
    this.persons = [];
    this.isManagerMode = false;
  }

  setManagerMode(isManagerMode) {
    this.isManagerMode = isManagerMode;
    this.renderPersonList();
  }

  addPerson(person) {
    this.persons.push(person);
    this.renderPersonList();
  }

  removePerson(code) {
    this.persons = this.persons.filter((person) => person.code !== code);
    this.renderPersonList();
  }

  updatePerson(code, updatedInfo) {
    const personIndex = this.persons.findIndex((person) => person.code === code);
    if (personIndex !== -1) {
      this.persons[personIndex] = { ...this.persons[personIndex], ...updatedInfo };
      this.renderPersonList();
    }
  }

  sortByName() {
    this.persons.sort((a, b) => a.name.localeCompare(b.name));
    this.renderPersonList();
  }

  filterByType(type) {
    return this.persons.filter((person) => person instanceof type);
  }

  renderPersonList() {
    const listContainer = document.getElementById("personList");
    listContainer.innerHTML = "";
    this.persons.forEach((person) => {
      const listItem = document.createElement("li");
      const displayInfo = this.isManagerMode
        ? `
        <input type="text" id="name_${person.code}" value="${person.name}" readonly>
        <input type="text" id="address_${person.code}" value="${person.address}" readonly>
        <input type="text" id="email_${person.code}" value="${person.email}" readonly>
      `
        : `<span>${person.displayInfo()}</span>`;

      listItem.innerHTML = `${displayInfo}`;
      listContainer.appendChild(listItem);
    });

  }
}



function addPerson() {
  const classType = document.getElementById("classType").value;
  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const code = document.getElementById("code").value;
  const email = document.getElementById("email").value;

  let person;

  if (classType === "Student") {
    const math = parseFloat(document.getElementById("math").value);
    const physics = parseFloat(document.getElementById("physics").value);
    const chemistry = parseFloat(document.getElementById("chemistry").value);
    person = new Student(name, address, code, email, math, physics, chemistry);
  } else if (classType === "Employee") {
    const workDays = parseInt(document.getElementById("workDays").value);
    const dailySalary = parseFloat(document.getElementById("dailySalary").value);
    person = new Employee(name, address, code, email, workDays, dailySalary);
  } else if (classType === "Customer") {
    const companyName = document.getElementById("companyName").value;
    const invoiceValue = parseFloat(document.getElementById("invoiceValue").value);
    const rating = parseInt(document.getElementById("rating").value);
    person = new Customer(name, address, code, email, companyName, invoiceValue, rating);
  } else if (classType === "Manager") {
    person = new Manager(name, address, code, email);
  }

  personList.addPerson(person);
  clearForm();
}

function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("address").value = "";
  document.getElementById("code").value = "";
  document.getElementById("email").value = "";
  document.getElementById("math").value = "";
  document.getElementById("physics").value = "";
  document.getElementById("chemistry").value = "";
  document.getElementById("workDays").value = "";
  document.getElementById("dailySalary").value = "";
  document.getElementById("companyName").value = "";
  document.getElementById("invoiceValue").value = "";
  document.getElementById("rating").value = "";
}

const personList = new ListPerson();
function updateForm() {
  const classType = document.getElementById("classType").value;
  const additionalFieldsContainer = document.getElementById("additionalFields");

  // Xóa các trường nhập cũ
  while (additionalFieldsContainer.firstChild) {
    additionalFieldsContainer.removeChild(additionalFieldsContainer.firstChild);
  }

  // Thêm trường nhập mới dựa vào loại người dùng được chọn
  if (classType === "Student") {
    additionalFieldsContainer.innerHTML = `
      <label for="math">Điểm Toán:</label>
      <input type="number" id="math" name="math" required>
      <label for="physics">Điểm Lý:</label>
      <input type="number" id="physics" name="physics" required>
      <label for="chemistry">Điểm Hóa:</label>
      <input type="number" id="chemistry" name="chemistry" required>
    `;
  } else if (classType === "Employee") {
    additionalFieldsContainer.innerHTML = `
      <label for="workDays">Số ngày làm việc:</label>
      <input type="number" id="workDays" name="workDays" required>
      <label for="dailySalary">Lương theo ngày:</label>
      <input type="number" id="dailySalary" name="dailySalary" required>
    `;
  } else if (classType === "Customer") {
    additionalFieldsContainer.innerHTML = `
      <label for="companyName">Tên công ty:</label>
      <input type="text" id="companyName" name="companyName" required>
      <label for="invoiceValue">Trị giá hóa đơn:</label>
      <input type="number" id="invoiceValue" name="invoiceValue" required>
      <label for="rating">Đánh giá:</label>
      <input type="number" id="rating" name="rating" required>
    `;
  }


  // Cập nhật giá trị của isManagerMode
  
}


function validateForm() {
  const nameInput = document.getElementById("name");
  const addressInput = document.getElementById("address");
  const codeInput = document.getElementById("code");
  const emailInput = document.getElementById("email");

  const nameError = document.getElementById("nameError");
  const addressError = document.getElementById("addressError");
  const codeError = document.getElementById("codeError");
  const emailError = document.getElementById("emailError");

  // Reset error messages
  nameError.textContent = "";
  addressError.textContent = "";
  codeError.textContent = "";
  emailError.textContent = "";

  // Validate name: First letter uppercase
  const namePattern = /^[A-Z][a-z]*$/;
  if (!namePattern.test(nameInput.value)) {
    nameError.textContent = "Viết hoa chữ cái đầu.";
  }

  // Validate address: First letter uppercase, at least 10 characters
  const addressPattern = /^[A-Z][a-z]{9,}$/;
  if (!addressPattern.test(addressInput.value)) {
    addressError.textContent = "Địa chỉ viết hoa chữ cái đầu và có ít nhất 10 kí tự.";
  }

  // Validate code: At least 6 digits
  const codePattern = /^\d{6,}$/;
  if (!codePattern.test(codeInput.value)) {
    codeError.textContent = "Mã nhân viên phải chứa ít nhất 6 số.";
  }

  // Validate email format
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(emailInput.value)) {
    emailError.textContent = "Email không đúng định dạng.";
  }

  // Check if all error messages are empty
  return nameError.textContent === "" &&
         addressError.textContent === "" &&
         codeError.textContent === "" &&
         emailError.textContent === "";
}

function addPerson() {
  // Validate the form before adding a person
  if (validateForm()) {
    const classType = document.getElementById("classType").value;
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const code = document.getElementById("code").value;
    const email = document.getElementById("email").value;

    let person;

    if (classType === "Student") {
      const math = parseFloat(document.getElementById("math").value);
      const physics = parseFloat(document.getElementById("physics").value);
      const chemistry = parseFloat(document.getElementById("chemistry").value);
      person = new Student(name, address, code, email, math, physics, chemistry);
    } else if (classType === "Employee") {
      const workDays = parseInt(document.getElementById("workDays").value);
      const dailySalary = parseFloat(document.getElementById("dailySalary").value);
      person = new Employee(name, address, code, email, workDays, dailySalary);
    } else if (classType === "Customer") {
      const companyName = document.getElementById("companyName").value;
      const invoiceValue = parseFloat(document.getElementById("invoiceValue").value);
      const rating = parseInt(document.getElementById("rating").value);
      person = new Customer(name, address, code, email, companyName, invoiceValue, rating);
    } else if (classType === "Manager") {
      person = new Manager(name, address, code, email);
    }

    personList.addPerson(person);
  } else {
    console.log("Please fix the errors in the form.");
  }
}
