
let students = [];

document.getElementById("studentForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let roll = document.getElementById("roll").value.trim();
    let company = document.getElementById("company").value.trim();
    let status = document.getElementById("status").value;

    if (!name || !roll || !company) {
        alert("Please fill all fields");
        return;
    }

    if (students.some(student => student.roll.toLowerCase() === roll.toLowerCase())) {
        alert("Roll number already exists");
        return;
    }

    students.push({ name, roll, company, status });

    document.getElementById("studentForm").reset();
    displayStudents();
});

function displayStudents() {
    let list = document.getElementById("studentList");
    let search = document.getElementById("search").value.toLowerCase();

    list.innerHTML = "";

    let filtered = students.filter(student =>
        student.name.toLowerCase().includes(search)
    );

    filtered.forEach(student => {
        let row = document.createElement("tr");

        [student.name, student.roll, student.company, student.status]
            .forEach(value => {
                let cell = document.createElement("td");
                cell.textContent = value;
                row.appendChild(cell);
            });

        let actionCell = document.createElement("td");
        let button = document.createElement("button");

        button.textContent = "Delete";
        button.className = "delete-btn";

        button.onclick = function() {
            students = students.filter(item => item.roll !== student.roll);
            displayStudents();
        };

        actionCell.appendChild(button);
        row.appendChild(actionCell);
        list.appendChild(row);
    });

    document.getElementById("count").textContent =
        "Total Students: " + students.length;
}

displayStudents();