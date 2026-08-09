  /**
         * ==========================================================================
         * CIRCLE LOGIC
         * ==========================================================================
         */
        class Circle {
            constructor(radius) {
                this._radius = Math.max(0, radius);
            }

            get radius() {
                return this._radius;
            }

            set radius(value) {
                this._radius = Math.max(0, parseFloat(value) || 0);
            }

            get diameter() {
                return this._radius * 2;
            }

            calculateArea() {
                return Math.PI * Math.pow(this._radius, 2);
            }

            calculateCircumference() {
                return 2 * Math.PI * this._radius;
            }
        }

        const circleInput = document.getElementById('circleRadius');
        const outRadius = document.getElementById('outRadius');
        const outDiameter = document.getElementById('outDiameter');
        const outArea = document.getElementById('outArea');
        const outCircumference = document.getElementById('outCircumference');
        
        const myCircle = new Circle(parseFloat(circleInput.value));

        function updateCircleUI() {
            myCircle.radius = circleInput.value;
            outRadius.textContent = myCircle.radius.toFixed(2);
            outDiameter.textContent = myCircle.diameter.toFixed(2);
            outArea.textContent = myCircle.calculateArea().toFixed(2);
            outCircumference.textContent = myCircle.calculateCircumference().toFixed(2);
        }

        circleInput.addEventListener('input', updateCircleUI);
        updateCircleUI();

        /**
         * ==========================================================================
         * MARKER LOGIC
         * ==========================================================================
         */
        class Marker {
            constructor(color, inkPercent) {
                this.color = color;
                this.inkPercent = Math.max(0, Math.min(100, inkPercent));
            }

            write(text) {
                let outputHtml = '';
                
                for (let i = 0; i < text.length; i++) {
                    const char = text[i];
                    
                    if (char.trim() !== '') {
                        if (this.inkPercent >= 0.5) {
                            this.inkPercent -= 0.5;
                            outputHtml += this._escapeHtml(char);
                        } else {
                            break;
                        }
                    } else {
                        outputHtml += char;
                    }
                }
                
                // Refactored to use inline CSS variables instead of direct color properties
                return `<span class="marker-text" style="--dynamic-color: ${this.color};">${outputHtml}</span>`;
            }

            _escapeHtml(unsafe) {
                return unsafe
                     .replace(/&/g, "&amp;")
                     .replace(/</g, "&lt;")
                     .replace(/>/g, "&gt;")
                     .replace(/"/g, "&quot;")
                     .replace(/'/g, "&#039;");
            }
        }

        class RefillableMarker extends Marker {
            constructor(color, inkPercent) {
                super(color, inkPercent);
            }

            refill(amount = 100) {
                this.inkPercent = Math.min(100, this.inkPercent + amount);
            }
        }

        const myMarker = new RefillableMarker('#2563eb', 100);
        
        const markerColorInput = document.getElementById('markerColor');
        const markerTextInput = document.getElementById('markerText');
        const btnWrite = document.getElementById('btnWrite');
        const btnRefill = document.getElementById('btnRefill');
        const markerOutput = document.getElementById('markerOutput');
        const inkProgress = document.getElementById('inkProgress');
        const inkPercentageText = document.getElementById('inkPercentage');

        function updateInkUI() {
            inkProgress.value = myMarker.inkPercent;
            inkPercentageText.textContent = `${myMarker.inkPercent.toFixed(1)}%`;
        }

        markerColorInput.addEventListener('input', (e) => {
            myMarker.color = e.target.value;
        });

        btnWrite.addEventListener('click', () => {
            const textToProcess = markerTextInput.value;
            if (!textToProcess) return;

            const htmlOutput = myMarker.write(textToProcess);
            markerOutput.innerHTML += htmlOutput + '<br>';
            updateInkUI();
            markerTextInput.value = '';
        });

        btnRefill.addEventListener('click', () => {
            myMarker.refill();
            updateInkUI();
        });

        /**
         * ==========================================================================
         * EMPLOYEE TABLE LOGIC
         * ==========================================================================
         */
        class Employee {
            constructor(id, firstName, lastName, position, department) {
                this.id = id;
                this.firstName = firstName;
                this.lastName = lastName;
                this.position = position;
                this.department = department;
            }
        }

        class EmpTable {
            constructor(employeeArray) {
                this.employees = employeeArray;
            }

            getHtml() {
                let htmlStr = `
                    <div class="table-responsive">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">First Name</th>
                                    <th scope="col">Last Name</th>
                                    <th scope="col">Position</th>
                                    <th scope="col">Department</th>
                                </tr>
                            </thead>
                            <tbody>
                `;

                this.employees.forEach(emp => {
                    const escape = (str) => String(str).replace(/[&<>'"]/g, 
                        tag => ({
                            '&': '&amp;',
                            '<': '&lt;',
                            '>': '&gt;',
                            "'": '&#39;',
                            '"': '&quot;'
                        }[tag]));

                    htmlStr += `
                        <tr>
                            <td>${escape(emp.id)}</td>
                            <td>${escape(emp.firstName)}</td>
                            <td>${escape(emp.lastName)}</td>
                            <td>${escape(emp.position)}</td>
                            <td>${escape(emp.department)}</td>
                        </tr>
                    `;
                });

                htmlStr += `
                            </tbody>
                        </table>
                    </div>
                `;

                return htmlStr;
            }
        }

        // English localized mock data
        const bankEmployees = [
            new Employee(101, 'Alexander', 'Smith', 'Manager', 'Lending'),
            new Employee(102, 'Maria', 'Johnson', 'Cashier', 'Customer Service'),
            new Employee(103, 'Peter', 'Davis', 'Analyst', 'Risk Management'),
            new Employee(104, 'Elena', 'Wilson', 'Branch Director', 'Management'),
            new Employee(105, 'Igor', 'Brown', 'IT Specialist', 'Technical Support')
        ];

        const employeeTable = new EmpTable(bankEmployees);
        document.addEventListener('DOMContentLoaded', () => {
            const tableContainer = document.getElementById('employeeTableContainer');
            tableContainer.innerHTML = employeeTable.getHtml();
        });

