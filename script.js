/* =========================================================
   SEETA REVIVAL CHURCH
   WEBSITE + ADMIN PANEL JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       DEFAULT DATA
    ===================================================== */

    const defaultEvents = [
        {
            id: 1,
            date: "28 AUGUST 2026",
            title: "Worship Night",
            description: "An evening of worship, prayer and encountering the presence of God.",
            link: "#contact"
        }
    ];

    const defaultSermons = [
        {
            id: 1,
            title: "Messages That Transform Lives",
            description: "Watch powerful teachings and sermons that will strengthen your faith.",
            link: "#watch-sermons"
        }
    ];

    const defaultContacts = {
        location: "Seeta, Kasangati, Uganda",
        email: "joshuantale118@gmail.com",

        pastorName: "Pr Daniel Musanje",
        pastorPhone: "0772314539",

        secondName: "Pr Joyce Musanje",
        secondPhone: "0758815389",

        thirdName: "Pr Wasswa James",
        thirdPhone: "0758428102"
    };

    const defaultGiving = {
        supportName: "Pr Daniel Musanje",

        mtnNumber: "0772314539",
        mtnAccount: "Pr Daniel Musanje",

        airtelNumber: "0752277443",
        airtelAccount: "Pr Daniel Musanje"
    };


    /* =====================================================
       LOCAL STORAGE FUNCTIONS
    ===================================================== */

    function getData(key, defaultValue) {

        const saved = localStorage.getItem(key);

        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (error) {
                return defaultValue;
            }
        }

        localStorage.setItem(key, JSON.stringify(defaultValue));

        return defaultValue;
    }


    function saveData(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }


    let events = getData("churchEvents", defaultEvents);
    let sermons = getData("churchSermons", defaultSermons);
    let contacts = getData("churchContacts", defaultContacts);
    let giving = getData("churchGiving", defaultGiving);
    let submissions = getData("churchSupportSubmissions", []);


    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", function () {
            navMenu.classList.toggle("active");
        });

        navMenu.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {
                navMenu.classList.remove("active");
            });

        });
    }


    /* =====================================================
       MODAL FUNCTIONS
    ===================================================== */

    function openModal(id) {

        const modal = document.getElementById(id);

        if (modal) {
            modal.classList.add("show");
        }
    }


    function closeModal(id) {

        const modal = document.getElementById(id);

        if (modal) {
            modal.classList.remove("show");
        }
    }


    document.querySelectorAll(".close-modal").forEach(function (button) {

        button.addEventListener("click", function () {

            const id = button.getAttribute("data-close");

            closeModal(id);

        });

    });


    document.querySelectorAll(".modal").forEach(function (modal) {

        modal.addEventListener("click", function (event) {

            if (event.target === modal) {
                modal.classList.remove("show");
            }

        });

    });


    /* =====================================================
       ADMIN LOGIN
    ===================================================== */

    const openLoginButton = document.getElementById("open-login");
    const loginModal = document.getElementById("login-modal");
    const loginForm = document.getElementById("login-form");
    const loginMessage = document.getElementById("login-message");

    if (openLoginButton) {

        openLoginButton.addEventListener("click", function () {
            openModal("login-modal");
        });

    }


    if (loginForm) {

        loginForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const username = document
                .getElementById("login-username")
                .value
                .trim();

            const password = document
                .getElementById("login-password")
                .value;

            /*
                CURRENT LOGIN DETAILS

                Username: admin
                Password: church123
            */

            if (username === "admin" && password === "church123") {

                loginMessage.textContent = "Login successful.";
                loginMessage.style.color = "#238636";

                setTimeout(function () {

                    closeModal("login-modal");

                    document
                        .getElementById("login-form")
                        .reset();

                    loginMessage.textContent = "";

                    openAdminPanel();

                }, 500);

            } else {

                loginMessage.textContent =
                    "Incorrect username or password.";

                loginMessage.style.color = "#b42318";

            }

        });

    }


    /* =====================================================
       ADMIN PANEL
    ===================================================== */

    const adminPanel = document.getElementById("admin-panel");
    const closeAdminButton = document.getElementById("close-admin");
    const logoutButton = document.getElementById("logout-btn");


    function openAdminPanel() {

        if (!adminPanel) return;

        adminPanel.classList.add("show");

        document.body.style.overflow = "hidden";

        renderAdminEvents();
        renderAdminSermons();
        renderSupportSubmissions();

        loadContactsForm();
        loadGivingForm();

    }


    function closeAdminPanel() {

        if (!adminPanel) return;

        adminPanel.classList.remove("show");

        document.body.style.overflow = "";

    }


    if (closeAdminButton) {

        closeAdminButton.addEventListener("click", function () {
            closeAdminPanel();
        });

    }


    if (logoutButton) {

        logoutButton.addEventListener("click", function () {

            closeAdminPanel();

        });

    }


    /* =====================================================
       ADMIN TABS
    ===================================================== */

    const adminTabs = document.querySelectorAll(".admin-tab");
    const adminSections = document.querySelectorAll(".admin-section");

    adminTabs.forEach(function (tab) {

        tab.addEventListener("click", function () {

            const target = tab.getAttribute("data-tab");

            adminTabs.forEach(function (item) {
                item.classList.remove("active");
            });

            adminSections.forEach(function (section) {
                section.classList.remove("active");
            });

            tab.classList.add("active");

            const targetSection = document.getElementById(target);

            if (targetSection) {
                targetSection.classList.add("active");
            }

        });

    });


    /* =====================================================
       EVENTS
    ===================================================== */

    const eventsList = document.getElementById("events-list");
    const adminEventsList = document.getElementById("admin-events-list");
    const addEventButton = document.getElementById("add-event-btn");


    function renderEvents() {

        if (!eventsList) return;

        if (events.length === 0) {

            eventsList.innerHTML = `
                <div class="event-card">
                    <h3>No Upcoming Events</h3>
                    <p>Please check back soon for upcoming church events.</p>
                </div>
            `;

            return;
        }


        eventsList.innerHTML = events.map(function (event) {

            return `
                <div class="event-card">

                    <p class="event-date">
                        ${escapeHTML(event.date)}
                    </p>

                    <h3>
                        ${escapeHTML(event.title)}
                    </h3>

                    <p>
                        ${escapeHTML(event.description)}
                    </p>

                    <a href="${safeLink(event.link)}"
                       class="event-btn">
                        Learn More
                    </a>

                </div>
            `;

        }).join("");

    }


    function renderAdminEvents() {

        if (!adminEventsList) return;

        if (events.length === 0) {

            adminEventsList.innerHTML = `
                <div class="empty">
                    <h3>No events yet</h3>
                    <p>Click "Add Event" to create your first event.</p>
                </div>
            `;

            return;
        }


        adminEventsList.innerHTML = events.map(function (event) {

            return `
                <div class="admin-item">

                    <div>

                        <h4>
                            ${escapeHTML(event.title)}
                        </h4>

                        <p>
                            <strong>${escapeHTML(event.date)}</strong>
                        </p>

                        <p>
                            ${escapeHTML(event.description)}
                        </p>

                    </div>

                    <div class="item-actions">

                        <button
                            class="edit-btn"
                            onclick="editEvent(${event.id})">
                            Edit
                        </button>

                        <button
                            class="delete-btn"
                            onclick="deleteEvent(${event.id})">
                            Delete
                        </button>

                    </div>

                </div>
            `;

        }).join("");

    }


    if (addEventButton) {

        addEventButton.addEventListener("click", function () {

            openEventEditor();

        });

    }


    function openEventEditor(event = null) {

        const modal = document.getElementById("editor-modal");
        const title = document.getElementById("editor-title");
        const form = document.getElementById("editor-form");

        if (!modal || !form) return;


        title.textContent = event
            ? "Edit Event"
            : "Add Event";


        form.innerHTML = `

            <label>Event Date</label>

            <input
                type="text"
                id="editor-event-date"
                required
                placeholder="e.g. 28 AUGUST 2026"
                value="${event ? escapeAttribute(event.date) : ""}"
            >


            <label>Event Title</label>

            <input
                type="text"
                id="editor-event-title"
                required
                placeholder="Event title"
                value="${event ? escapeAttribute(event.title) : ""}"
            >


            <label>Description</label>

            <textarea
                id="editor-event-description"
                rows="4"
                required
                placeholder="Describe the event..."
            >${event ? escapeHTML(event.description) : ""}</textarea>


            <label>Learn More Link</label>

            <input
                type="text"
                id="editor-event-link"
                placeholder="#contact or https://..."
                value="${event ? escapeAttribute(event.link) : "#contact"}"
            >


            <button
                class="form-btn"
                type="submit">
                ${event ? "Save Changes" : "Add Event"}
            </button>

            <p
                class="form-message"
                id="editor-message">
            </p>
        `;


        form.onsubmit = function (e) {

            e.preventDefault();

            const eventData = {

                date: document
                    .getElementById("editor-event-date")
                    .value
                    .trim(),

                title: document
                    .getElementById("editor-event-title")
                    .value
                    .trim(),

                description: document
                    .getElementById("editor-event-description")
                    .value
                    .trim(),

                link: document
                    .getElementById("editor-event-link")
                    .value
                    .trim() || "#contact"

            };


            if (event) {

                events = events.map(function (item) {

                    if (item.id === event.id) {

                        return {
                            ...item,
                            ...eventData
                        };

                    }

                    return item;

                });

            } else {

                eventData.id = Date.now();

                events.push(eventData);

            }


            saveData("churchEvents", events);

            renderEvents();
            renderAdminEvents();

            closeModal("editor-modal");

        };


        openModal("editor-modal");

    }


    window.editEvent = function (id) {

        const event = events.find(function (item) {
            return item.id === id;
        });

        if (event) {
            openEventEditor(event);
        }

    };


    window.deleteEvent = function (id) {

        const event = events.find(function (item) {
            return item.id === id;
        });

        if (!event) return;


        const confirmed = confirm(
            `Delete "${event.title}"?`
        );


        if (!confirmed) return;


        events = events.filter(function (item) {
            return item.id !== id;
        });


        saveData("churchEvents", events);

        renderEvents();
        renderAdminEvents();

    };


    /* =====================================================
       SERMONS
    ===================================================== */

    const sermonsList = document.getElementById("sermons-list");
    const adminSermonsList = document.getElementById("admin-sermons-list");
    const addSermonButton = document.getElementById("add-sermon-btn");


    function renderSermons() {

        if (!sermonsList) return;


        if (sermons.length === 0) {

            sermonsList.innerHTML = `
                <div class="sermon-card">
                    <h3>No Sermons Available</h3>
                    <p>New sermons will appear here.</p>
                </div>
            `;

            return;
        }


        sermonsList.innerHTML = sermons.map(function (sermon) {

            return `
                <div class="sermon-card">

                    <div class="sermon-icon">
                        ▶
                    </div>

                    <h3>
                        ${escapeHTML(sermon.title)}
                    </h3>

                    <p>
                        ${escapeHTML(sermon.description)}
                    </p>

                    <a
                        href="${safeLink(sermon.link)}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="watch-link">
                        Watch Sermon →
                    </a>

                </div>
            `;

        }).join("");

    }


    function renderAdminSermons() {

        if (!adminSermonsList) return;


        if (sermons.length === 0) {

            adminSermonsList.innerHTML = `
                <div class="empty">
                    <h3>No sermons yet</h3>
                    <p>Click "Add Sermon" to add one.</p>
                </div>
            `;

            return;
        }


        adminSermonsList.innerHTML = sermons.map(function (sermon) {

            return `
                <div class="admin-item">

                    <div>

                        <h4>
                            ${escapeHTML(sermon.title)}
                        </h4>

                        <p>
                            ${escapeHTML(sermon.description)}
                        </p>

                        <p>
                            ${escapeHTML(sermon.link)}
                        </p>

                    </div>

                    <div class="item-actions">

                        <button
                            class="edit-btn"
                            onclick="editSermon(${sermon.id})">
                            Edit
                        </button>

                        <button
                            class="delete-btn"
                            onclick="deleteSermon(${sermon.id})">
                            Delete
                        </button>

                    </div>

                </div>
            `;

        }).join("");

    }


    if (addSermonButton) {

        addSermonButton.addEventListener("click", function () {

            openSermonEditor();

        });

    }


    function openSermonEditor(sermon = null) {

        const modal = document.getElementById("editor-modal");
        const title = document.getElementById("editor-title");
        const form = document.getElementById("editor-form");

        if (!modal || !form) return;


        title.textContent = sermon
            ? "Edit Sermon"
            : "Add Sermon";


        form.innerHTML = `

            <label>Sermon Title</label>

            <input
                type="text"
                id="editor-sermon-title"
                required
                placeholder="Sermon title"
                value="${sermon ? escapeAttribute(sermon.title) : ""}"
            >


            <label>Description</label>

            <textarea
                id="editor-sermon-description"
                rows="4"
                required
                placeholder="Sermon description..."
            >${sermon ? escapeHTML(sermon.description) : ""}</textarea>


            <label>Sermon Video Link</label>

            <input
                type="url"
                id="editor-sermon-link"
                required
                placeholder="https://youtube.com/..."
                value="${sermon ? escapeAttribute(sermon.link) : ""}"
            >


            <button
                class="form-btn"
                type="submit">
                ${sermon ? "Save Changes" : "Add Sermon"}
            </button>

            <p
                class="form-message"
                id="editor-message">
            </p>
        `;


        form.onsubmit = function (e) {

            e.preventDefault();


            const sermonData = {

                title: document
                    .getElementById("editor-sermon-title")
                    .value
                    .trim(),

                description: document
                    .getElementById("editor-sermon-description")
                    .value
                    .trim(),

                link: document
                    .getElementById("editor-sermon-link")
                    .value
                    .trim()

            };


            if (sermon) {

                sermons = sermons.map(function (item) {

                    if (item.id === sermon.id) {

                        return {
                            ...item,
                            ...sermonData
                        };

                    }

                    return item;

                });

            } else {

                sermonData.id = Date.now();

                sermons.push(sermonData);

            }


            saveData("churchSermons", sermons);

            renderSermons();
            renderAdminSermons();

            closeModal("editor-modal");

        };


        openModal("editor-modal");

    }


    window.editSermon = function (id) {

        const sermon = sermons.find(function (item) {
            return item.id === id;
        });

        if (sermon) {
            openSermonEditor(sermon);
        }

    };


    window.deleteSermon = function (id) {

        const sermon = sermons.find(function (item) {
            return item.id === id;
        });

        if (!sermon) return;


        const confirmed = confirm(
            `Delete "${sermon.title}"?`
        );


        if (!confirmed) return;


        sermons = sermons.filter(function (item) {
            return item.id !== id;
        });


        saveData("churchSermons", sermons);

        renderSermons();
        renderAdminSermons();

    };


    /* =====================================================
       CONTACTS
    ===================================================== */

    const contactsList = document.getElementById("contacts-list");
    const contactsForm = document.getElementById("contacts-form");


    function renderContacts() {

        if (!contactsList) return;


        contactsList.innerHTML = `

            <div class="contact-person">

                <div>
                    <strong>
                        ${escapeHTML(contacts.pastorName)}
                    </strong>

                    <span>
                        Lead Pastor
                    </span>
                </div>

                <a href="tel:${phoneValue(contacts.pastorPhone)}">
                    ${escapeHTML(contacts.pastorPhone)}
                </a>

            </div>


            <div class="contact-person">

                <div>
                    <strong>
                        ${escapeHTML(contacts.secondName)}
                    </strong>

                    <span>
                        Pastor
                    </span>
                </div>

                <a href="tel:${phoneValue(contacts.secondPhone)}">
                    ${escapeHTML(contacts.secondPhone)}
                </a>

            </div>


            <div class="contact-person">

                <div>
                    <strong>
                        ${escapeHTML(contacts.thirdName)}
                    </strong>

                    <span>
                        Pastor
                    </span>
                </div>

                <a href="tel:${phoneValue(contacts.thirdPhone)}">
                    ${escapeHTML(contacts.thirdPhone)}
                </a>

            </div>

        `;

    }


    function loadContactsForm() {

        if (!contactsForm) return;


        document.getElementById("admin-location").value =
            contacts.location;

        document.getElementById("admin-email").value =
            contacts.email;

        document.getElementById("admin-pastor-name").value =
            contacts.pastorName;

        document.getElementById("admin-pastor-phone").value =
            contacts.pastorPhone;

        document.getElementById("admin-second-name").value =
            contacts.secondName;

        document.getElementById("admin-second-phone").value =
            contacts.secondPhone;

        document.getElementById("admin-third-name").value =
            contacts.thirdName;

        document.getElementById("admin-third-phone").value =
            contacts.thirdPhone;

    }


    if (contactsForm) {

        contactsForm.addEventListener("submit", function (event) {

            event.preventDefault();


            contacts = {

                location:
                    document.getElementById("admin-location").value.trim(),

                email:
                    document.getElementById("admin-email").value.trim(),

                pastorName:
                    document.getElementById("admin-pastor-name").value.trim(),

                pastorPhone:
                    document.getElementById("admin-pastor-phone").value.trim(),

                secondName:
                    document.getElementById("admin-second-name").value.trim(),

                secondPhone:
                    document.getElementById("admin-second-phone").value.trim(),

                thirdName:
                    document.getElementById("admin-third-name").value.trim(),

                thirdPhone:
                    document.getElementById("admin-third-phone").value.trim()

            };


            saveData("churchContacts", contacts);

            renderContacts();
            updateContactInformation();


            const message =
                document.getElementById("contacts-message");

            message.textContent =
                "Contact information saved successfully.";

            setTimeout(function () {
                message.textContent = "";
            }, 3000);

        });

    }


    function updateContactInformation() {

        const location =
            document.getElementById("church-location");

        const email =
            document.getElementById("church-email");

        const emailButton =
            document.getElementById("email-button");


        if (location) {
            location.textContent = contacts.location;
        }


        if (email) {
            email.textContent = contacts.email;
        }


        if (emailButton) {
            emailButton.href =
                "mailto:" + contacts.email;
        }

    }


    /* =====================================================
       GIVING INFORMATION
    ===================================================== */

    const givingForm =
        document.getElementById("giving-form");


    function loadGivingForm() {

        if (!givingForm) return;


        document.getElementById("admin-support-name").value =
            giving.supportName;

        document.getElementById("admin-mtn-number").value =
            giving.mtnNumber;

        document.getElementById("admin-mtn-account").value =
            giving.mtnAccount;

        document.getElementById("admin-airtel-number").value =
            giving.airtelNumber;

        document.getElementById("admin-airtel-account").value =
            giving.airtelAccount;

    }


    if (givingForm) {

        givingForm.addEventListener("submit", function (event) {

            event.preventDefault();


            giving = {

                supportName:
                    document.getElementById("admin-support-name").value.trim(),

                mtnNumber:
                    document.getElementById("admin-mtn-number").value.trim(),

                mtnAccount:
                    document.getElementById("admin-mtn-account").value.trim(),

                airtelNumber:
                    document.getElementById("admin-airtel-number").value.trim(),

                airtelAccount:
                    document.getElementById("admin-airtel-account").value.trim()

            };


            saveData("churchGiving", giving);

            updateGivingInformation();


            const message =
                document.getElementById("giving-message");

            message.textContent =
                "Giving information saved successfully.";

            setTimeout(function () {
                message.textContent = "";
            }, 3000);

        });

    }


    function updateGivingInformation() {

        const supportName =
            document.getElementById("support-name");

        const mtnNumber =
            document.getElementById("mtn-number");

        const mtnAccount =
            document.getElementById("mtn-account");

        const airtelNumber =
            document.getElementById("airtel-number");

        const airtelAccount =
            document.getElementById("airtel-account");


        if (supportName) {
            supportName.textContent =
                giving.supportName;
        }


        if (mtnNumber) {

            mtnNumber.textContent =
                formatPhone(giving.mtnNumber);

            mtnNumber.href =
                "tel:" + phoneValue(giving.mtnNumber);

        }


        if (mtnAccount) {
            mtnAccount.textContent =
                giving.mtnAccount;
        }


        if (airtelNumber) {

            airtelNumber.textContent =
                formatPhone(giving.airtelNumber);

            airtelNumber.href =
                "tel:" + phoneValue(giving.airtelNumber);

        }


        if (airtelAccount) {
            airtelAccount.textContent =
                giving.airtelAccount;
        }

    }


    /* =====================================================
       SUPPORT FORM
    ===================================================== */

    const supportButton =
        document.getElementById("open-support-form");

    const supportForm =
        document.getElementById("support-form");


    if (supportButton) {

        supportButton.addEventListener("click", function () {
            openModal("support-modal");
        });

    }


    if (supportForm) {

        supportForm.addEventListener("submit", function (event) {

            event.preventDefault();


            const name =
                document.getElementById("giver-name").value.trim();

            const phone =
                document.getElementById("giver-phone").value.trim();

            const amount =
                document.getElementById("support-amount").value;

            const network =
                document.getElementById("support-network").value;

            const note =
                document.getElementById("support-note").value.trim();

            const proofInput =
                document.getElementById("support-proof");


            let proofName = "";

            if (
                proofInput &&
                proofInput.files &&
                proofInput.files.length > 0
            ) {

                proofName =
                    proofInput.files[0].name;

            }


            const submission = {

                id: Date.now(),

                name: name,

                phone: phone,

                amount: Number(amount),

                network: network,

                note: note,

                proofName: proofName,

                status: "Pending",

                date: new Date().toLocaleString()

            };


            submissions.push(submission);

            saveData(
                "churchSupportSubmissions",
                submissions
            );


            const message =
                document.getElementById("support-message");

            message.textContent =
                "Thank you. Your support has been submitted successfully.";

            message.style.color = "#238636";


            renderSupportSubmissions();


            setTimeout(function () {

                supportForm.reset();

                closeModal("support-modal");

                message.textContent = "";

            }, 1800);

        });

    }


    /* =====================================================
       SUPPORT SUBMISSIONS / ADMIN
    ===================================================== */

    const submissionsList =
        document.getElementById("support-submissions-list");


    function renderSupportSubmissions() {

        if (!submissionsList) return;


        if (submissions.length === 0) {

            submissionsList.innerHTML = `
                <div class="empty">

                    <h3>No Support Submissions</h3>

                    <p>
                        Support records submitted by visitors
                        will appear here.
                    </p>

                </div>
            `;

            return;
        }


        submissionsList.innerHTML =
            submissions
                .slice()
                .reverse()
                .map(function (submission) {

                    const statusClass =
                        submission.status === "Received"
                            ? "received"
                            : "pending";


                    return `

                        <div class="admin-item">

                            <div>

                                <h4>
                                    ${escapeHTML(submission.name)}
                                </h4>

                                <p>
                                    <strong>
                                        UGX ${Number(submission.amount).toLocaleString()}
                                    </strong>
                                </p>

                                <p>
                                    Phone:
                                    ${escapeHTML(submission.phone)}
                                </p>

                                <p>
                                    Network:
                                    ${escapeHTML(submission.network)}
                                </p>

                                <p>
                                    Date:
                                    ${escapeHTML(submission.date)}
                                </p>

                                ${
                                    submission.proofName
                                    ? `
                                        <p>
                                            Proof:
                                            ${escapeHTML(submission.proofName)}
                                        </p>
                                    `
                                    : `
                                        <p>
                                            Proof:
                                            Not uploaded
                                        </p>
                                    `
                                }

                                ${
                                    submission.note
                                    ? `
                                        <p>
                                            Note:
                                            ${escapeHTML(submission.note)}
                                        </p>
                                    `
                                    : ""
                                }

                                <span class="status ${statusClass}">
                                    ${escapeHTML(submission.status)}
                                </span>

                            </div>


                            <div class="item-actions">

                                ${
                                    submission.status !== "Received"
                                    ? `
                                        <button
                                            class="received-btn"
                                            onclick="markSupportReceived(${submission.id})">
                                            Received
                                        </button>
                                    `
                                    : `
                                        <button
                                            class="edit-btn"
                                            disabled>
                                            ✓ Received
                                        </button>
                                    `
                                }


                                <button
                                    class="delete-btn"
                                    onclick="deleteSupportSubmission(${submission.id})">
                                    Delete
                                </button>

                            </div>

                        </div>

                    `;

                })
                .join("");

    }


    window.markSupportReceived = function (id) {

        submissions = submissions.map(function (submission) {

            if (submission.id === id) {

                return {
                    ...submission,
                    status: "Received"
                };

            }

            return submission;

        });


        saveData(
            "churchSupportSubmissions",
            submissions
        );


        renderSupportSubmissions();

    };


    window.deleteSupportSubmission = function (id) {

        const confirmed =
            confirm("Delete this support record?");


        if (!confirmed) return;


        submissions =
            submissions.filter(function (submission) {

                return submission.id !== id;

            });


        saveData(
            "churchSupportSubmissions",
            submissions
        );


        renderSupportSubmissions();

    };


    /* =====================================================
       INITIAL WEBSITE RENDER
    ===================================================== */

    renderEvents();

    renderSermons();

    renderContacts();

    renderSupportSubmissions();

    updateContactInformation();

    updateGivingInformation();


    /* =====================================================
       ESCAPE HTML - SECURITY
    ===================================================== */

    function escapeHTML(value) {

        if (value === undefined || value === null) {
            return "";
        }


        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    function escapeAttribute(value) {
        return escapeHTML(value);
    }


    /* =====================================================
       SAFE LINKS
    ===================================================== */

    function safeLink(link) {

        if (!link) {
            return "#";
        }


        const value = String(link).trim();


        if (
            value.startsWith("#") ||
            value.startsWith("/") ||
            value.startsWith("https://") ||
            value.startsWith("http://")
        ) {

            return escapeAttribute(value);

        }


        return "#";

    }


    /* =====================================================
       PHONE FUNCTIONS
    ===================================================== */

    function phoneValue(phone) {

        if (!phone) {
            return "";
        }


        return String(phone)
            .replace(/[^\d+]/g, "");

    }


    function formatPhone(phone) {

        if (!phone) {
            return "";
        }


        const digits =
            String(phone).replace(/\D/g, "");


        if (digits.length === 10) {

            return digits.substring(0, 4)
                + " "
                + digits.substring(4, 7)
                + " "
                + digits.substring(7);

        }


        return phone;

    }


    /* =====================================================
       CLOSE MODALS WITH ESCAPE KEY
    ===================================================== */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            document
                .querySelectorAll(".modal.show")
                .forEach(function (modal) {

                    modal.classList.remove("show");

                });

        }

    });

});
