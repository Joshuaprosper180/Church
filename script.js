const STORAGE_KEY = "seetaRevivalData";


/* =========================
   DEFAULT DATA
========================= */

const defaultData = {

    events: [
        {
            id: 1,
            date: "28 AUGUST 2026",
            title: "Worship Night",
            description:
                "An evening of worship, prayer and encountering the presence of God.",
            link: "#contact"
        }
    ],

    sermons: [
        {
            id: 1,
            title: "Messages That Transform Lives",
            description:
                "Watch powerful teachings and sermons that will strengthen your faith.",
            link: "#watch-sermons"
        }
    ],

    schedule: [

        {
            id: 1,
            day: "Sunday",
            title: "English Service",
            time: "8:00 AM - 10:00 AM",
            description: "English worship service."
        },

        {
            id: 2,
            day: "Sunday",
            title: "Second Service",
            time: "10:00 AM - 1:00 PM",
            description: "Main worship and teaching service."
        },

        {
            id: 3,
            day: "Monday",
            title: "Youth Led Service",
            time: "5:30 PM - 8:00 PM",
            description: "A service led by the youth."
        },

        {
            id: 4,
            day: "Tuesday",
            title: "Evening Glory",
            time: "6:00 PM - 8:00 PM",
            description: "A time of worship, prayer and fellowship."
        },

        {
            id: 5,
            day: "Wednesday",
            title: "Bible Study",
            time: "5:30 PM - 8:00 PM",
            description: "Study and grow in God's Word."
        },

        {
            id: 6,
            day: "Thursday",
            title: "House Church",
            time: "6:00 PM - 8:00 PM",
            description:
                "Fellowship and ministry in smaller gatherings."
        },

        {
            id: 7,
            day: "Thursday",
            title: "Intercession",
            time: "10:00 PM - 4:00 AM",
            description:
                "A night of prayer and intercession."
        },

        {
            id: 8,
            day: "Friday",
            title: "Church Altar",
            time: "7:00 PM - 10:00 PM",
            description:
                "A time of seeking God at the altar."
        },

        {
            id: 9,
            day: "Last Friday of the Month",
            title: "Overnight",
            time: "Overnight",
            description:
                "Monthly overnight prayer and worship service."
        }

    ],

    scripture: {
        reference: "Psalm 118:24",
        text:
            "This is the day which the LORD hath made; we will rejoice and be glad in it."
    },

    contacts: {
        location: "Seeta, Kasangati, Uganda",
        email: "joshuantale118@gmail.com",

        pastorName: "Pr Daniel Musanje",
        pastorPhone: "0772314539",

        secondName: "Pr Joyce Musanje",
        secondPhone: "0758815389",

        thirdName: "Pr Wasswa James",
        thirdPhone: "0758428102"
    },

    giving: {
        supportName: "Pr Daniel Musanje",

        mtnNumber: "0772314539",
        mtnAccount: "Pr Daniel Musanje",

        airtelNumber: "0752277443",
        airtelAccount: "Pr Daniel Musanje"
    },

    submissions: []

};


/* =========================
   HELPERS
========================= */

function clone(value) {
    return JSON.parse(JSON.stringify(value));
}


function loadData() {

    try {

        const saved = JSON.parse(
            localStorage.getItem(STORAGE_KEY) || "null"
        );

        if (!saved) {
            return clone(defaultData);
        }

        return {
            ...clone(defaultData),
            ...saved,

            events: Array.isArray(saved.events)
                ? saved.events
                : clone(defaultData.events),

            sermons: Array.isArray(saved.sermons)
                ? saved.sermons
                : clone(defaultData.sermons),

            schedule: Array.isArray(saved.schedule)
                ? saved.schedule
                : clone(defaultData.schedule),

            submissions: Array.isArray(saved.submissions)
                ? saved.submissions
                : [],

            scripture: {
                ...defaultData.scripture,
                ...(saved.scripture || {})
            },

            contacts: {
                ...defaultData.contacts,
                ...(saved.contacts || {})
            },

            giving: {
                ...defaultData.giving,
                ...(saved.giving || {})
            }

        };

    } catch (error) {

        return clone(defaultData);

    }

}


let data = loadData();


const $ = (id) => document.getElementById(id);


function save() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
    );

}


function escapeHTML(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


function formatPhone(phone) {

    const number = String(phone || "")
        .replace(/\D/g, "");

    if (number.length === 10) {

        return (
            number.slice(0, 4) +
            " " +
            number.slice(4, 7) +
            " " +
            number.slice(7)
        );

    }

    return phone || "";

}


/* =========================
   MODALS
========================= */

function openModal(id) {

    const modal = $(id);

    if (modal) {

        modal.classList.add("show");

        document.body.style.overflow = "hidden";

    }

}


function closeModal(id) {

    const modal = $(id);

    if (modal) {
        modal.classList.remove("show");
    }

    const openModalExists =
        document.querySelector(".modal.show");

    const adminOpen =
        $("admin-panel").classList.contains("show");

    if (!openModalExists && !adminOpen) {

        document.body.style.overflow = "";

    }

}


/* =========================
   EVENTS
========================= */

function renderEvents() {

    const container = $("events-list");

    if (!container) return;

    if (data.events.length === 0) {

        container.innerHTML =
            `<div class="empty">
                No upcoming events available.
            </div>`;

        return;

    }

    container.innerHTML =
        data.events.map(event => `

            <article class="event-card">

                <p class="event-date">
                    ${escapeHTML(event.date)}
                </p>

                <h3>
                    ${escapeHTML(event.title)}
                </h3>

                <p>
                    ${escapeHTML(event.description)}
                </p>

                <a
                    class="event-btn"
                    href="${event.link || "#contact"}"
                >
                    Learn More
                </a>

            </article>

        `).join("");

}


/* =========================
   SERMONS
========================= */

function renderSermons() {

    const container = $("sermons-list");

    if (!container) return;

    if (data.sermons.length === 0) {

        container.innerHTML =
            `<div class="empty">
                No sermons available.
            </div>`;

        return;

    }

    container.innerHTML =
        data.sermons.map(sermon => `

            <article class="sermon-card">

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
                    class="watch-link"
                    href="${sermon.link || "#watch-sermons"}"
                    ${sermon.link.startsWith("http")
                        ? 'target="_blank"'
                        : ""}
                >
                    Watch Sermon →
                </a>

            </article>

        `).join("");

}


/* =========================
   CHURCH PROGRAM
========================= */

function renderSchedule() {

    const container = $("schedule-list");

    if (!container) return;

    container.innerHTML =
        data.schedule.map(item => `

            <article class="schedule-card">

                <span class="schedule-day">
                    ${escapeHTML(item.day)}
                </span>

                <h3>
                    ${escapeHTML(item.title)}
                </h3>

                <p class="schedule-time">
                    🕒 ${escapeHTML(item.time)}
                </p>

                <p>
                    ${escapeHTML(item.description)}
                </p>

            </article>

        `).join("");

}


/* =========================
   SCRIPTURE
========================= */

function renderScripture() {

    const text = $("scripture-text");

    const reference =
        $("scripture-reference");

    if (text) {
        text.textContent = data.scripture.text;
    }

    if (reference) {
        reference.textContent =
            "— " + data.scripture.reference;
    }

}


/* =========================
   CONTACTS
========================= */

function renderContacts() {

    $("church-location").textContent =
        data.contacts.location;

    $("church-email").textContent =
        data.contacts.email;


    const container =
        $("contacts-list");

    if (!container) return;


    const people = [

        {
            name: data.contacts.pastorName,
            phone: data.contacts.pastorPhone,
            role: "Lead Pastor"
        },

        {
            name: data.contacts.secondName,
            phone: data.contacts.secondPhone,
            role: "Pastor"
        },

        {
            name: data.contacts.thirdName,
            phone: data.contacts.thirdPhone,
            role: "Pastor"
        }

    ];


    container.innerHTML =
        people.map(person => `

            <div class="contact-person">

                <div>

                    <strong>
                        ${escapeHTML(person.name)}
                    </strong>

                    <span>
                        ${escapeHTML(person.role)}
                    </span>

                </div>

                <a href="tel:${person.phone}">
                    ${formatPhone(person.phone)}
                </a>

            </div>

        `).join("");

}


/* =========================
   GIVING
========================= */

function renderGiving() {

    $("support-name").textContent =
        data.giving.supportName;

    $("mtn-account").textContent =
        data.giving.mtnAccount;

    $("airtel-account").textContent =
        data.giving.airtelAccount;


    $("mtn-number").textContent =
        formatPhone(data.giving.mtnNumber);

    $("mtn-number").href =
        "tel:" + data.giving.mtnNumber;


    $("airtel-number").textContent =
        formatPhone(data.giving.airtelNumber);

    $("airtel-number").href =
        "tel:" + data.giving.airtelNumber;

}


/* =========================
   SUPPORT RECORDS
========================= */

function renderSupportSubmissions() {

    const container =
        $("support-submissions-list");

    if (!container) return;


    if (data.submissions.length === 0) {

        container.innerHTML =
            `<div class="empty">
                No support submissions yet.
            </div>`;

        return;

    }


    container.innerHTML =
        data.submissions.map(item => `

            <div class="support-record">

                <h4>
                    ${escapeHTML(item.name)}
                </h4>

                <p>
                    ${escapeHTML(item.phone)}
                </p>

                <p>
                    UGX ${escapeHTML(item.amount)}
                </p>

                <p>
                    ${escapeHTML(item.network)}
                </p>

                <p>
                    ${escapeHTML(item.date)}
                </p>

                <span class="status ${
                    item.status === "Received"
                        ? "received"
                        : "pending"
                }">

                    ${escapeHTML(item.status)}

                </span>


                <div class="item-actions">

                    ${
                        item.status !== "Received"

                        ? `<button
                            class="received-btn"
                            onclick="markSupportReceived(${item.id})"
                        >
                            Received
                           </button>`

                        : ""
                    }


                    <button
                        class="delete-btn"
                        onclick="deleteSupportSubmission(${item.id})"
                    >
                        Delete
                    </button>

                </div>

            </div>

        `).join("");

}


function markSupportReceived(id) {

    const item =
        data.submissions.find(
            item => item.id === id
        );

    if (item) {

        item.status = "Received";

        save();

        renderSupportSubmissions();

    }

}


function deleteSupportSubmission(id) {

    if (!confirm("Delete this support record?")) {
        return;
    }

    data.submissions =
        data.submissions.filter(
            item => item.id !== id
        );

    save();

    renderSupportSubmissions();

}


/* =========================
   ADMIN EVENTS
========================= */

function renderAdminEvents() {

    const container =
        $("admin-events-list");

    if (!container) return;


    container.innerHTML =
        data.events.map(event => `

            <div class="admin-item">

                <div>

                    <h4>
                        ${escapeHTML(event.title)}
                    </h4>

                    <p>
                        ${escapeHTML(event.date)}
                    </p>

                    <p>
                        ${escapeHTML(event.description)}
                    </p>

                </div>


                <div class="item-actions">

                    <button
                        class="edit-btn"
                        onclick="editEvent(${event.id})"
                    >
                        Edit
                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteEvent(${event.id})"
                    >
                        Delete
                    </button>

                </div>

            </div>

        `).join("");

}


function editEvent(id) {

    const event =
        data.events.find(
            item => item.id === id
        );

    openEditor("event", event);

}


function deleteEvent(id) {

    if (!confirm("Delete this event?")) return;

    data.events =
        data.events.filter(
            item => item.id !== id
        );

    save();

    renderEvents();

    renderAdminEvents();

}


/* =========================
   ADMIN SERMONS
========================= */

function renderAdminSermons() {

    const container =
        $("admin-sermons-list");

    if (!container) return;


    container.innerHTML =
        data.sermons.map(sermon => `

            <div class="admin-item">

                <div>

                    <h4>
                        ${escapeHTML(sermon.title)}
                    </h4>

                    <p>
                        ${escapeHTML(sermon.description)}
                    </p>

                </div>


                <div class="item-actions">

                    <button
                        class="edit-btn"
                        onclick="editSermon(${sermon.id})"
                    >
                        Edit
                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteSermon(${sermon.id})"
                    >
                        Delete
                    </button>

                </div>

            </div>

        `).join("");

}


function editSermon(id) {

    const sermon =
        data.sermons.find(
            item => item.id === id
        );

    openEditor("sermon", sermon);

}


function deleteSermon(id) {

    if (!confirm("Delete this sermon?")) return;

    data.sermons =
        data.sermons.filter(
            item => item.id !== id
        );

    save();

    renderSermons();

    renderAdminSermons();

}


/* =========================
   ADMIN SCHEDULE
========================= */

function renderAdminSchedule() {

    const container =
        $("admin-schedule-list");

    if (!container) return;


    container.innerHTML =
        data.schedule.map(item => `

            <div class="admin-item">

                <div>

                    <h4>
                        ${escapeHTML(item.day)}
                        —
                        ${escapeHTML(item.title)}
                    </h4>

                    <p>
                        ${escapeHTML(item.time)}
                    </p>

                    <p>
                        ${escapeHTML(item.description)}
                    </p>

                </div>


                <div class="item-actions">

                    <button
                        class="edit-btn"
                        onclick="editSchedule(${item.id})"
                    >
                        Edit
                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteSchedule(${item.id})"
                    >
                        Delete
                    </button>

                </div>

            </div>

        `).join("");

}


function editSchedule(id) {

    const item =
        data.schedule.find(
            item => item.id === id
        );

    openEditor("schedule", item);

}


function deleteSchedule(id) {

    if (!confirm("Delete this program?")) return;

    data.schedule =
        data.schedule.filter(
            item => item.id !== id
        );

    save();

    renderSchedule();

    renderAdminSchedule();

}


/* =========================
   EDITOR
========================= */

function openEditor(type, item = null) {

    const title =
        $("editor-title");

    const form =
        $("editor-form");


    form.dataset.type = type;

    form.dataset.id =
        item ? item.id : "";


    if (type === "event") {

        title.textContent =
            item ? "Edit Event" : "Add Event";


        form.innerHTML = `

            <label>Event Date</label>

            <input
                id="ed-date"
                required
                value="${item ? item.date : ""}"
            >


            <label>Event Name</label>

            <input
                id="ed-title"
                required
                value="${item ? item.title : ""}"
            >


            <label>Description</label>

            <textarea
                id="ed-description"
                rows="4"
                required
            >${item ? item.description : ""}</textarea>


            <label>Link</label>

            <input
                id="ed-link"
                value="${item ? item.link : "#contact"}"
            >


            <button
                class="form-btn"
                type="submit"
            >
                ${item ? "Update Event" : "Add Event"}
            </button>

        `;

    }


    if (type === "sermon") {

        title.textContent =
            item ? "Edit Sermon" : "Add Sermon";


        form.innerHTML = `

            <label>Sermon Title</label>

            <input
                id="ed-title"
                required
                value="${item ? item.title : ""}"
            >


            <label>Description</label>

            <textarea
                id="ed-description"
                rows="4"
                required
            >${item ? item.description : ""}</textarea>


            <label>Sermon Link</label>

            <input
                id="ed-link"
                value="${item ? item.link : ""}"
            >


            <button
                class="form-btn"
                type="submit"
            >
                ${item ? "Update Sermon" : "Add Sermon"}
            </button>

        `;

    }


    if (type === "schedule") {

        title.textContent =
            item ? "Edit Program" : "Add Program";


        form.innerHTML = `

            <label>Day</label>

            <input
                id="ed-day"
                required
                value="${item ? item.day : ""}"
            >


            <label>Program / Service</label>

            <input
                id="ed-title"
                required
                value="${item ? item.title : ""}"
            >


            <label>Time</label>

            <input
                id="ed-time"
                required
                value="${item ? item.time : ""}"
            >


            <label>Description</label>

            <textarea
                id="ed-description"
                rows="4"
            >${item ? item.description : ""}</textarea>


            <button
                class="form-btn"
                type="submit"
            >
                ${item ? "Update Program" : "Add Program"}
            </button>

        `;

    }


    openModal("editor-modal");

}


/* =========================
   SAVE EDITOR
========================= */

function saveEditor() {

    const form =
        $("editor-form");

    const type =
        form.dataset.type;

    const id =
        Number(form.dataset.id) || 0;


    if (type === "event") {

        const item = {

            id: id || Date.now(),

            date:
                $("ed-date").value.trim(),

            title:
                $("ed-title").value.trim(),

            description:
                $("ed-description").value.trim(),

            link:
                $("ed-link").value.trim()

        };


        if (id) {

            data.events =
                data.events.map(event =>
                    event.id === id
                        ? item
                        : event
                );

        } else {

            data.events.push(item);

        }


        renderEvents();

        renderAdminEvents();

    }


    if (type === "sermon") {

        const item = {

            id: id || Date.now(),

            title:
                $("ed-title").value.trim(),

            description:
                $("ed-description").value.trim(),

            link:
                $("ed-link").value.trim()

        };


        if (id) {

            data.sermons =
                data.sermons.map(sermon =>
                    sermon.id === id
                        ? item
                        : sermon
                );

        } else {

            data.sermons.push(item);

        }


        renderSermons();

        renderAdminSermons();

    }


    if (type === "schedule") {

        const item = {

            id: id || Date.now(),

            day:
                $("ed-day").value.trim(),

            title:
                $("ed-title").value.trim(),

            time:
                $("ed-time").value.trim(),

            description:
                $("ed-description").value.trim()

        };


        if (id) {

            data.schedule =
                data.schedule.map(schedule =>
                    schedule.id === id
                        ? item
                        : schedule
                );

        } else {

            data.schedule.push(item);

        }


        renderSchedule();

        renderAdminSchedule();

    }


    save();

    closeModal("editor-modal");

}


/* =========================
   ADMIN PANEL
========================= */

function openAdmin() {

    $("admin-panel")
        .classList.add("show");

    document.body.style.overflow =
        "hidden";

    renderAdminEvents();

    renderAdminSermons();

    renderAdminSchedule();

    loadAdminForms();

    renderSupportSubmissions();

}


function closeAdmin() {

    $("admin-panel")
        .classList.remove("show");

    document.body.style.overflow = "";

}


function loadAdminForms() {

    $("admin-location").value =
        data.contacts.location;

    $("admin-email").value =
        data.contacts.email;

    $("admin-pastor-name").value =
        data.contacts.pastorName;

    $("admin-pastor-phone").value =
        data.contacts.pastorPhone;

    $("admin-second-name").value =
        data.contacts.secondName;

    $("admin-second-phone").value =
        data.contacts.secondPhone;

    $("admin-third-name").value =
        data.contacts.thirdName;

    $("admin-third-phone").value =
        data.contacts.thirdPhone;


    $("admin-support-name").value =
        data.giving.supportName;

    $("admin-mtn-number").value =
        data.giving.mtnNumber;

    $("admin-mtn-account").value =
        data.giving.mtnAccount;

    $("admin-airtel-number").value =
        data.giving.airtelNumber;

    $("admin-airtel-account").value =
        data.giving.airtelAccount;


    $("admin-scripture-reference").value =
        data.scripture.reference;

    $("admin-scripture-text").value =
        data.scripture.text;

}


/* =========================
   PAGE LOAD
========================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {


        /* MENU */

        $("menu-toggle")
            .addEventListener(
                "click",
                () => {

                    $("nav-menu")
                        .classList.toggle("active");

                }
            );


        document
            .querySelectorAll("#nav-menu a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    () => {

                        $("nav-menu")
                            .classList.remove("active");

                    }
                );

            });


        /* INITIAL RENDER */

        renderEvents();

        renderSermons();

        renderSchedule();

        renderScripture();

        renderContacts();

        renderGiving();

        renderSupportSubmissions();


        /* LOGIN */

        $("open-login")
            .addEventListener(
                "click",
                () => openModal("login-modal")
            );


        $("login-form")
            .addEventListener(
                "submit",
                event => {

                    event.preventDefault();


                    const username =
                        $("login-username")
                            .value.trim();

                    const password =
                        $("login-password")
                            .value;


                    if (
                        username === "admin" &&
                        password === "church123"
                    ) {

                        $("login-message")
                            .textContent =
                            "Login successful!";


                        setTimeout(
                            () => {

                                closeModal(
                                    "login-modal"
                                );

                                openAdmin();

                            },
                            300
                        );

                    } else {

                        $("login-message")
                            .textContent =
                            "Incorrect username or password.";

                    }

                }
            );


        /* SUPPORT MODAL */

        $("open-support-form")
            .addEventListener(
                "click",
                () => openModal("support-modal")
            );


        /* CLOSE MODALS */

        document
            .querySelectorAll(".close-modal")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        closeModal(
                            button.dataset.close
                        );

                    }
                );

            });


        /* CLOSE ADMIN */

        $("close-admin")
            .addEventListener(
                "click",
                closeAdmin
            );


        $("logout-btn")
            .addEventListener(
                "click",
                closeAdmin
            );


        /* ADMIN TABS */

        document
            .querySelectorAll(".admin-tab")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        document
                            .querySelectorAll(
                                ".admin-tab"
                            )
                            .forEach(tab => {

                                tab.classList.remove(
                                    "active"
                                );

                            });


                        document
                            .querySelectorAll(
                                ".admin-section"
                            )
                            .forEach(section => {

                                section.classList.remove(
                                    "active"
                                );

                            });


                        button.classList.add(
                            "active"
                        );


                        $(
                            button.dataset.tab
                        ).classList.add(
                            "active"
                        );

                    }
                );

            });


        /* ADD BUTTONS */

        $("add-event-btn")
            .addEventListener(
                "click",
                () => openEditor("event")
            );


        $("add-sermon-btn")
            .addEventListener(
                "click",
                () => openEditor("sermon")
            );


        $("add-schedule-btn")
            .addEventListener(
                "click",
                () => openEditor("schedule")
            );


        /* EDITOR FORM */

        $("editor-form")
            .addEventListener(
                "submit",
                event => {

                    event.preventDefault();

                    saveEditor();

                }
            );


        /* CONTACT FORM */

        $("contacts-form")
            .addEventListener(
                "submit",
                event => {

                    event.preventDefault();


                    data.contacts.location =
                        $("admin-location")
                            .value.trim();

                    data.contacts.email =
                        $("admin-email")
                            .value.trim();

                    data.contacts.pastorName =
                        $("admin-pastor-name")
                            .value.trim();

                    data.contacts.pastorPhone =
                        $("admin-pastor-phone")
                            .value.trim();

                    data.contacts.secondName =
                        $("admin-second-name")
                            .value.trim();

                    data.contacts.secondPhone =
                        $("admin-second-phone")
                            .value.trim();

                    data.contacts.thirdName =
                        $("admin-third-name")
                            .value.trim();

                    data.contacts.thirdPhone =
                        $("admin-third-phone")
                            .value.trim();


                    save();

                    renderContacts();


                    $("contacts-message")
                        .textContent =
                        "Contact information saved successfully.";

                }
            );


        /* GIVING FORM */

        $("giving-form")
            .addEventListener(
                "submit",
                event => {

                    event.preventDefault();


                    data.giving.supportName =
                        $("admin-support-name")
                            .value.trim();

                    data.giving.mtnNumber =
                        $("admin-mtn-number")
                            .value.trim();

                    data.giving.mtnAccount =
                        $("admin-mtn-account")
                            .value.trim();

                    data.giving.airtelNumber =
                        $("admin-airtel-number")
                            .value.trim();

                    data.giving.airtelAccount =
                        $("admin-airtel-account")
                            .value.trim();


                    save();

                    renderGiving();


                    $("giving-message")
                        .textContent =
                        "Giving information saved successfully.";

                }
            );


        /* SCRIPTURE FORM */

        $("scripture-form")
            .addEventListener(
                "submit",
                event => {

                    event.preventDefault();


                    data.scripture.reference =
                        $("admin-scripture-reference")
                            .value.trim();

                    data.scripture.text =
                        $("admin-scripture-text")
                            .value.trim();


                    save();

                    renderScripture();


                    $("scripture-message")
                        .textContent =
                        "Scripture of the day saved successfully.";

                }
            );


        /* SUPPORT FORM */

        $("support-form")
            .addEventListener(
                "submit",
                event => {

                    event.preventDefault();


                    const name =
                        $("giver-name")
                            .value.trim();

                    const phone =
                        $("giver-phone")
                            .value.trim();

                    const amount =
                        $("support-amount")
                            .value.trim();


                    if (!name || !phone || !amount) {
                        return;
                    }


                    data.submissions.unshift({

                        id: Date.now(),

                        name: name,

                        phone: phone,

                        amount: amount,

                        network:
                            $("support-network").value,

                        note:
                            $("support-note")
                                .value.trim(),

                        status: "Pending",

                        date:
                            new Date()
                                .toLocaleString()

                    });


                    save();

                    renderSupportSubmissions();


                    $("support-message")
                        .textContent =
                        "Thank you! Your support has been submitted.";


                    event.target.reset();


                    setTimeout(
                        () => {

                            closeModal(
                                "support-modal"
                            );

                        },
                        1000
                    );

                }
            );

    }
);


/* =========================
   GLOBAL FUNCTIONS
========================= */

window.editEvent = editEvent;

window.deleteEvent = deleteEvent;

window.editSermon = editSermon;

window.deleteSermon = deleteSermon;

window.editSchedule = editSchedule;

window.deleteSchedule = deleteSchedule;

window.markSupportReceived =
    markSupportReceived;

window.deleteSupportSubmission =
    deleteSupportSubmission;/* =========================================================
   SEETA REVIVAL CHURCH
   COMPLETE WEBSITE JAVASCRIPT
========================================================= */


/* =========================================================
   DEFAULT WEBSITE DATA
========================================================= */

const defaultData = {

    events: [
        {
            id: 1,
            date: "28 AUGUST 2026",
            title: "Worship Night",
            description:
                "An evening of worship, prayer and encountering the presence of God.",
            link: "#contact"
        }
    ],

    sermons: [
        {
            id: 1,
            title: "Messages That Transform Lives",
            description:
                "Watch powerful teachings and sermons that will strengthen your faith.",
            link: "#watch-sermons"
        }
    ],

    contacts: {
        location: "Seeta, Kasangati, Uganda",
        email: "joshuantale118@gmail.com",

        pastorName: "Pr Daniel Musanje",
        pastorPhone: "0772314539",

        secondName: "Pr Joyce Musanje",
        secondPhone: "0758815389",

        thirdName: "Pr Wasswa James",
        thirdPhone: "0758428102"
    },

    giving: {
        supportName: "Pr Daniel Musanje",

        mtnNumber: "0772314539",
        mtnAccount: "Pr Daniel Musanje",

        airtelNumber: "0752277443",
        airtelAccount: "Pr Daniel Musanje"
    },

    submissions: []
};


/* =========================================================
   LOAD DATA
========================================================= */

function loadData() {

    const savedData = localStorage.getItem("seetaRevivalData");

    if (!savedData) {
        return JSON.parse(JSON.stringify(defaultData));
    }

    try {

        const parsed = JSON.parse(savedData);

        return {

            ...JSON.parse(JSON.stringify(defaultData)),

            ...parsed,

            events: Array.isArray(parsed.events)
                ? parsed.events
                : [],

            sermons: Array.isArray(parsed.sermons)
                ? parsed.sermons
                : [],

            submissions: Array.isArray(parsed.submissions)
                ? parsed.submissions
                : [],

            contacts: {
                ...defaultData.contacts,
                ...(parsed.contacts || {})
            },

            giving: {
                ...defaultData.giving,
                ...(parsed.giving || {})
            }

        };

    } catch (error) {

        console.error(
            "Could not load saved website data:",
            error
        );

        return JSON.parse(JSON.stringify(defaultData));
    }
}


let data = loadData();


/* =========================================================
   SAVE DATA
========================================================= */

function saveData() {

    try {

        localStorage.setItem(
            "seetaRevivalData",
            JSON.stringify(data)
        );

        return true;

    } catch (error) {

        console.error(
            "Could not save website data:",
            error
        );

        alert(
            "The information could not be saved. " +
            "The browser storage may be full."
        );

        return false;
    }
}


/* =========================================================
   HELPER
========================================================= */

function getElement(id) {

    return document.getElementById(id);

}


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* =====================================================
           MOBILE MENU
        ===================================================== */

        const menuToggle =
            getElement("menu-toggle");

        const navMenu =
            getElement("nav-menu");


        if (menuToggle && navMenu) {

            menuToggle.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();
                    event.stopPropagation();

                    navMenu.classList.toggle("active");

                    menuToggle.classList.toggle("active");

                }
            );


            const navLinks =
                navMenu.querySelectorAll("a");


            navLinks.forEach(
                function (link) {

                    link.addEventListener(
                        "click",
                        function () {

                            navMenu.classList.remove(
                                "active"
                            );

                            menuToggle.classList.remove(
                                "active"
                            );

                        }
                    );

                }
            );

        }


        /* =====================================================
           INITIAL WEBSITE RENDER
        ===================================================== */

        renderEvents();

        renderSermons();

        renderContacts();

        renderGiving();

        renderSupportSubmissions();


        /* =====================================================
           ADMIN LOGIN
        ===================================================== */

        const openLoginButton =
            getElement("open-login");


        if (openLoginButton) {

            openLoginButton.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    openModal("login-modal");

                }
            );

        }


        /* =====================================================
           SUPPORT BUTTON
        ===================================================== */

        const supportButton =
            getElement("open-support-form");


        if (supportButton) {

            supportButton.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    openModal("support-modal");

                }
            );

        }


        /* =====================================================
           LOGIN FORM
        ===================================================== */

        const loginForm =
            getElement("login-form");


        if (loginForm) {

            loginForm.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();


                    const username =
                        getElement("login-username")
                            ?.value
                            .trim();

                    const password =
                        getElement("login-password")
                            ?.value
                            .trim();

                    const message =
                        getElement("login-message");


                    /*
                       CURRENT DEMO LOGIN

                       Username:
                       admin

                       Password:
                       church123
                    */

                    if (
                        username === "admin" &&
                        password === "church123"
                    ) {

                        if (message) {

                            message.textContent =
                                "Login successful!";

                            message.style.color =
                                "#238636";

                        }


                        setTimeout(
                            function () {

                                closeModal(
                                    "login-modal"
                                );

                                openAdminPanel();

                                loginForm.reset();

                                if (message) {

                                    message.textContent =
                                        "";

                                }

                            },
                            500
                        );

                    } else {

                        if (message) {

                            message.textContent =
                                "Incorrect username or password.";

                            message.style.color =
                                "#b42318";

                        }

                    }

                }
            );

        }


        /* =====================================================
           SUPPORT FORM
        ===================================================== */

        const supportForm =
            getElement("support-form");


        if (supportForm) {

            supportForm.addEventListener(
                "submit",
                async function (event) {

                    event.preventDefault();


                    const name =
                        getElement("giver-name")
                            ?.value
                            .trim();

                    const phone =
                        getElement("giver-phone")
                            ?.value
                            .trim();

                    const amount =
                        getElement("support-amount")
                            ?.value
                            .trim();

                    const network =
                        getElement("support-network")
                            ?.value
                            .trim();

                    const proofInput =
                        getElement("support-proof");

                    const note =
                        getElement("support-note")
                            ?.value
                            .trim();

                    const message =
                        getElement("support-message");


                    /* -----------------------------------------
                       VALIDATION
                    ----------------------------------------- */

                    if (!name || !phone || !amount) {

                        if (message) {

                            message.textContent =
                                "Please fill in all required fields.";

                            message.style.color =
                                "#b42318";

                        }

                        return;
                    }


                    /* -----------------------------------------
                       READ PROOF FILE
                    ----------------------------------------- */

                    let proof = null;


                    if (
                        proofInput &&
                        proofInput.files &&
                        proofInput.files.length > 0
                    ) {

                        const file =
                            proofInput.files[0];


                        /*
                           Limit large files because
                           localStorage has limited space.
                        */

                        if (
                            file.size >
                            2 * 1024 * 1024
                        ) {

                            if (message) {

                                message.textContent =
                                    "Proof file is too large. " +
                                    "Please upload a file below 2MB.";

                                message.style.color =
                                    "#b42318";

                            }

                            return;
                        }


                        try {

                            const fileData =
                                await readFileAsDataURL(
                                    file
                                );


                            proof = {

                                name: file.name,

                                type: file.type,

                                size: file.size,

                                data: fileData

                            };

                        } catch (error) {

                            console.error(
                                "Could not read proof:",
                                error
                            );

                        }

                    }


                    /* -----------------------------------------
                       CREATE SUBMISSION
                    ----------------------------------------- */

                    const submission = {

                        id: Date.now(),

                        name: name,

                        phone: phone,

                        amount: amount,

                        network:
                            network || "Not specified",

                        proof: proof,

                        note: note,

                        status: "Pending",

                        date:
                            new Date().toLocaleString()

                    };


                    data.submissions.unshift(
                        submission
                    );


                    if (!saveData()) {

                        data.submissions.shift();

                        return;

                    }


                    renderSupportSubmissions();


                    if (message) {

                        message.textContent =
                            "Thank you! Your support has been submitted.";

                        message.style.color =
                            "#238636";

                    }


                    setTimeout(
                        function () {

                            supportForm.reset();

                            closeModal(
                                "support-modal"
                            );

                            if (message) {

                                message.textContent =
                                    "";

                            }

                        },
                        1500
                    );

                }
            );

        }


        /* =====================================================
           CLOSE MODALS
        ===================================================== */

        document
            .querySelectorAll(".close-modal")
            .forEach(
                function (button) {

                    button.addEventListener(
                        "click",
                        function () {

                            const modalId =
                                button.getAttribute(
                                    "data-close"
                                );

                            if (modalId) {

                                closeModal(
                                    modalId
                                );

                            }

                        }
                    );

                }
            );


        /* =====================================================
           CLICK OUTSIDE MODAL
        ===================================================== */

        document
            .querySelectorAll(".modal")
            .forEach(
                function (modal) {

                    modal.addEventListener(
                        "click",
                        function (event) {

                            if (
                                event.target ===
                                modal
                            ) {

                                modal.classList.remove(
                                    "show"
                                );

                                document.body.style
                                    .overflow = "";

                            }

                        }
                    );

                }
            );


        /* =====================================================
           ESCAPE KEY
        ===================================================== */

        document.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Escape") {

                    document
                        .querySelectorAll(
                            ".modal.show"
                        )
                        .forEach(
                            function (modal) {

                                modal.classList.remove(
                                    "show"
                                );

                            }
                        );


                    const adminPanel =
                        getElement("admin-panel");


                    if (
                        adminPanel &&
                        adminPanel.classList.contains(
                            "show"
                        )
                    ) {

                        adminPanel.classList.remove(
                            "show"
                        );

                    }


                    document.body.style.overflow =
                        "";

                }

            }
        );


        /* =====================================================
           ADMIN CLOSE
        ===================================================== */

        const closeAdmin =
            getElement("close-admin");


        if (closeAdmin) {

            closeAdmin.addEventListener(
                "click",
                function () {

                    closeAdminPanel();

                }
            );

        }


        /* =====================================================
           LOGOUT
        ===================================================== */

        const logoutButton =
            getElement("logout-btn");


        if (logoutButton) {

            logoutButton.addEventListener(
                "click",
                function () {

                    closeAdminPanel();

                }
            );

        }


        /* =====================================================
           ADMIN TABS
        ===================================================== */

        document
            .querySelectorAll(".admin-tab")
            .forEach(
                function (button) {

                    button.addEventListener(
                        "click",
                        function () {

                            const tabId =
                                button.getAttribute(
                                    "data-tab"
                                );


                            document
                                .querySelectorAll(
                                    ".admin-tab"
                                )
                                .forEach(
                                    function (tab) {

                                        tab.classList.remove(
                                            "active"
                                        );

                                    }
                                );


                            button.classList.add(
                                "active"
                            );


                            document
                                .querySelectorAll(
                                    ".admin-section"
                                )
                                .forEach(
                                    function (section) {

                                        section.classList.remove(
                                            "active"
                                        );

                                    }
                                );


                            const section =
                                getElement(tabId);


                            if (section) {

                                section.classList.add(
                                    "active"
                                );

                            }

                        }
                    );

                }
            );


        /* =====================================================
           ADD EVENT BUTTON
        ===================================================== */

        const addEventButton =
            getElement("add-event-btn");


        if (addEventButton) {

            addEventButton.addEventListener(
                "click",
                function () {

                    openEventEditor();

                }
            );

        }


        /* =====================================================
           ADD SERMON BUTTON
        ===================================================== */

        const addSermonButton =
            getElement("add-sermon-btn");


        if (addSermonButton) {

            addSermonButton.addEventListener(
                "click",
                function () {

                    openSermonEditor();

                }
            );

        }


        /* =====================================================
           CONTACT FORM
        ===================================================== */

        const contactsForm =
            getElement("contacts-form");


        if (contactsForm) {

            contactsForm.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();


                    data.contacts.location =
                        getElement(
                            "admin-location"
                        )?.value || "";


                    data.contacts.email =
                        getElement(
                            "admin-email"
                        )?.value || "";


                    data.contacts.pastorName =
                        getElement(
                            "admin-pastor-name"
                        )?.value || "";


                    data.contacts.pastorPhone =
                        getElement(
                            "admin-pastor-phone"
                        )?.value || "";


                    data.contacts.secondName =
                        getElement(
                            "admin-second-name"
                        )?.value || "";


                    data.contacts.secondPhone =
                        getElement(
                            "admin-second-phone"
                        )?.value || "";


                    data.contacts.thirdName =
                        getElement(
                            "admin-third-name"
                        )?.value || "";


                    data.contacts.thirdPhone =
                        getElement(
                            "admin-third-phone"
                        )?.value ||
                        data.contacts.thirdPhone ||
                        "";


                    saveData();

                    renderContacts();


                    const message =
                        getElement(
                            "contacts-message"
                        );


                    if (message) {

                        message.textContent =
                            "Contact information saved successfully.";

                        message.style.color =
                            "#238636";

                    }

                }
            );

        }


        /* =====================================================
           GIVING FORM
        ===================================================== */

        const givingForm =
            getElement("giving-form");


        if (givingForm) {

            givingForm.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();


                    data.giving.supportName =
                        getElement(
                            "admin-support-name"
                        )?.value || "";


                    data.giving.mtnNumber =
                        getElement(
                            "admin-mtn-number"
                        )?.value || "";


                    data.giving.mtnAccount =
                        getElement(
                            "admin-mtn-account"
                        )?.value || "";


                    data.giving.airtelNumber =
                        getElement(
                            "admin-airtel-number"
                        )?.value || "";


                    data.giving.airtelAccount =
                        getElement(
                            "admin-airtel-account"
                        )?.value || "";


                    saveData();

                    renderGiving();


                    const message =
                        getElement(
                            "giving-message"
                        );


                    if (message) {

                        message.textContent =
                            "Giving information saved successfully.";

                        message.style.color =
                            "#238636";

                    }

                }
            );

        }


        /* =====================================================
           EDITOR FORM
        ===================================================== */

        const editorForm =
            getElement("editor-form");


        if (editorForm) {

            editorForm.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();

                    saveEditorItem();

                }
            );

        }


        /* =====================================================
           PREVENT ADMIN PANEL CLICK PROPAGATION
        ===================================================== */

        const adminPanel =
            getElement("admin-panel");


        if (adminPanel) {

            adminPanel.addEventListener(
                "click",
                function (event) {

                    event.stopPropagation();

                }
            );

        }

    }
);


/* =========================================================
   FILE READER
========================================================= */

function readFileAsDataURL(file) {

    return new Promise(
        function (resolve, reject) {

            const reader =
                new FileReader();


            reader.onload =
                function () {

                    resolve(
                        reader.result
                    );

                };


            reader.onerror =
                function () {

                    reject(
                        reader.error
                    );

                };


            reader.readAsDataURL(file);

        }
    );

}


/* =========================================================
   MODALS
========================================================= */

function openModal(id) {

    const modal =
        getElement(id);


    if (!modal) {

        console.error(
            "Modal not found:",
            id
        );

        return;

    }


    modal.classList.add(
        "show"
    );


    document.body.style.overflow =
        "hidden";

}


function closeModal(id) {

    const modal =
        getElement(id);


    if (!modal) return;


    modal.classList.remove(
        "show"
    );


    document.body.style.overflow =
        "";

}


/* =========================================================
   ADMIN PANEL
========================================================= */

function openAdminPanel() {

    const panel =
        getElement("admin-panel");


    if (!panel) {

        console.error(
            "Admin panel not found."
        );

        return;

    }


    panel.classList.add(
        "show"
    );


    document.body.style.overflow =
        "hidden";


    renderAdminEvents();

    renderAdminSermons();

    loadContactForm();

    loadGivingForm();

    renderSupportSubmissions();

}


function closeAdminPanel() {

    const panel =
        getElement("admin-panel");


    if (!panel) return;


    panel.classList.remove(
        "show"
    );


    document.body.style.overflow =
        "";

}


/* =========================================================
   PUBLIC EVENTS
========================================================= */

function renderEvents() {

    const container =
        getElement("events-list");


    if (!container) return;


    if (!data.events.length) {

        container.innerHTML =
            '<div class="empty">No upcoming events available.</div>';

        return;

    }


    container.innerHTML =
        data.events
            .map(
                function (event) {

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

                            <a
                                href="${safeLink(
                                    event.link ||
                                    "#contact"
                                )}"
                                class="event-btn"
                            >
                                Learn More
                            </a>

                        </div>

                    `;

                }
            )
            .join("");

}


/* =========================================================
   ADMIN EVENTS
========================================================= */

function renderAdminEvents() {

    const container =
        getElement("admin-events-list");


    if (!container) return;


    if (!data.events.length) {

        container.innerHTML =
            '<div class="empty">No events have been added.</div>';

        return;

    }


    container.innerHTML =
        data.events
            .map(
                function (event) {

                    return `

                        <div class="admin-item">

                            <div>

                                <h4>
                                    ${escapeHTML(
                                        event.title
                                    )}
                                </h4>

                                <p>
                                    ${escapeHTML(
                                        event.date
                                    )}
                                </p>

                                <p>
                                    ${escapeHTML(
                                        event.description
                                    )}
                                </p>

                            </div>

                            <div class="item-actions">

                                <button
                                    class="edit-btn"
                                    onclick="editEvent(${event.id})"
                                >
                                    Edit
                                </button>

                                <button
                                    class="delete-btn"
                                    onclick="deleteEvent(${event.id})"
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    `;

                }
            )
            .join("");

}


/* =========================================================
   EVENT EDITOR
========================================================= */

function openEventEditor(event = null) {

    const title =
        getElement("editor-title");

    const form =
        getElement("editor-form");


    if (!title || !form) return;


    title.textContent =
        event
            ? "Edit Event"
            : "Add Event";


    form.dataset.type =
        "event";


    form.dataset.id =
        event
            ? event.id
            : "";


    form.innerHTML = `

        <label>Event Date</label>

        <input
            id="editor-date"
            required
            value="${
                event
                    ? escapeAttribute(event.date)
                    : ""
            }"
            placeholder="28 AUGUST 2026"
        >


        <label>Event Name</label>

        <input
            id="editor-name"
            required
            value="${
                event
                    ? escapeAttribute(event.title)
                    : ""
            }"
            placeholder="Worship Night"
        >


        <label>Description</label>

        <textarea
            id="editor-description"
            rows="4"
            required
            placeholder="Describe the event..."
        >${
            event
                ? escapeHTML(event.description)
                : ""
        }</textarea>


        <label>Learn More Link</label>

        <input
            id="editor-link"
            value="${
                event
                    ? escapeAttribute(
                        event.link ||
                        "#contact"
                    )
                    : "#contact"
            }"
            placeholder="#contact"
        >


        <button
            type="submit"
            class="form-btn"
        >
            ${
                event
                    ? "Update Event"
                    : "Add Event"
            }
        </button>


        <p
            class="form-message"
            id="editor-message"
        ></p>

    `;


    openModal(
        "editor-modal"
    );

}


/* =========================================================
   SAVE EVENT / SERMON
========================================================= */

function saveEditorItem() {

    const form =
        getElement("editor-form");


    if (!form) return;


    const type =
        form.dataset.type;


    const id =
        form.dataset.id;


    /* =====================================================
       EVENT
    ===================================================== */

    if (type === "event") {

        const date =
            getElement("editor-date");

        const name =
            getElement("editor-name");

        const description =
            getElement(
                "editor-description"
            );

        const link =
            getElement("editor-link");


        if (
            !date ||
            !name ||
            !description
        ) {

            return;

        }


        if (id) {

            const event =
                data.events.find(
                    function (item) {

                        return item.id == id;

                    }
                );


            if (event) {

                event.date =
                    date.value;

                event.title =
                    name.value;

                event.description =
                    description.value;

                event.link =
                    link
                        ? link.value
                        : "#contact";

            }

        } else {

            data.events.push({

                id: Date.now(),

                date:
                    date.value,

                title:
                    name.value,

                description:
                    description.value,

                link:
                    link
                        ? link.value
                        : "#contact"

            });

        }


        saveData();

        renderEvents();

        renderAdminEvents();

        closeModal(
            "editor-modal"
        );

        return;
    }


    /* =====================================================
       SERMON
    ===================================================== */

    if (type === "sermon") {

        const sermonTitle =
            getElement(
                "editor-sermon-title"
            );

        const sermonDescription =
            getElement(
                "editor-sermon-description"
            );

        const sermonLink =
            getElement(
                "editor-sermon-link"
            );


        if (
            !sermonTitle ||
            !sermonDescription
        ) {

            return;

        }


        if (id) {

            const sermon =
                data.sermons.find(
                    function (item) {

                        return item.id == id;

                    }
                );


            if (sermon) {

                sermon.title =
                    sermonTitle.value;

                sermon.description =
                    sermonDescription.value;

                sermon.link =
                    sermonLink
                        ? sermonLink.value
                        : "";

            }

        } else {

            data.sermons.push({

                id: Date.now(),

                title:
                    sermonTitle.value,

                description:
                    sermonDescription.value,

                link:
                    sermonLink
                        ? sermonLink.value
                        : ""

            });

        }


        saveData();

        renderSermons();

        renderAdminSermons();

        closeModal(
            "editor-modal"
        );

    }

}


/* =========================================================
   EDIT EVENT
========================================================= */

function editEvent(id) {

    const event =
        data.events.find(
            function (item) {

                return item.id == id;

            }
        );


    if (event) {

        openEventEditor(
            event
        );

    }

}


/* =========================================================
   DELETE EVENT
========================================================= */

function deleteEvent(id) {

    if (
        !confirm(
            "Delete this event?"
        )
    ) {

        return;

    }


    data.events =
        data.events.filter(
            function (event) {

                return event.id != id;

            }
        );


    saveData();

    renderEvents();

    renderAdminEvents();

}


/* =========================================================
   PUBLIC SERMONS
========================================================= */

function renderSermons() {

    const container =
        getElement("sermons-list");


    if (!container) return;


    if (!data.sermons.length) {

        container.innerHTML =
            '<div class="empty">No sermons available.</div>';

        return;

    }


    container.innerHTML =
        data.sermons
            .map(
                function (sermon) {

                    const link =
                        sermon.link ||
                        "#watch-sermons";


                    return `

                        <div class="sermon-card">

                            <div class="sermon-icon">
                                ▶
                            </div>

                            <h3>
                                ${escapeHTML(
                                    sermon.title
                                )}
                            </h3>

                            <p>
                                ${escapeHTML(
                                    sermon.description
                                )}
                            </p>

                            <a
                                href="${safeLink(link)}"
                                class="watch-link"
                                ${
                                    isExternalLink(link)
                                        ? 'target="_blank" rel="noopener noreferrer"'
                                        : ""
                                }
                            >
                                Watch Sermon →
                            </a>

                        </div>

                    `;

                }
            )
            .join("");

}


/* =========================================================
   ADMIN SERMONS
========================================================= */

function renderAdminSermons() {

    const container =
        getElement(
            "admin-sermons-list"
        );


    if (!container) return;


    if (!data.sermons.length) {

        container.innerHTML =
            '<div class="empty">No sermons have been added.</div>';

        return;

    }


    container.innerHTML =
        data.sermons
            .map(
                function (sermon) {

                    return `

                        <div class="admin-item">

                            <div>

                                <h4>
                                    ${escapeHTML(
                                        sermon.title
                                    )}
                                </h4>

                                <p>
                                    ${escapeHTML(
                                        sermon.description
                                    )}
                                </p>

                            </div>

                            <div class="item-actions">

                                <button
                                    class="edit-btn"
                                    onclick="editSermon(${sermon.id})"
                                >
                                    Edit
                                </button>

                                <button
                                    class="delete-btn"
                                    onclick="deleteSermon(${sermon.id})"
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    `;

                }
            )
            .join("");

}


/* =========================================================
   SERMON EDITOR
========================================================= */

function openSermonEditor(
    sermon = null
) {

    const title =
        getElement("editor-title");

    const form =
        getElement("editor-form");


    if (!title || !form) return;


    title.textContent =
        sermon
            ? "Edit Sermon"
            : "Add Sermon";


    form.dataset.type =
        "sermon";


    form.dataset.id =
        sermon
            ? sermon.id
            : "";


    form.innerHTML = `

        <label>Sermon Title</label>

        <input
            id="editor-sermon-title"
            required
            value="${
                sermon
                    ? escapeAttribute(
                        sermon.title
                    )
                    : ""
            }"
            placeholder="Enter sermon title"
        >


        <label>Description</label>

        <textarea
            id="editor-sermon-description"
            rows="4"
            required
            placeholder="Enter sermon description"
        >${
            sermon
                ? escapeHTML(
                    sermon.description
                )
                : ""
        }</textarea>


        <label>Sermon Link</label>

        <input
            id="editor-sermon-link"
            value="${
                sermon
                    ? escapeAttribute(
                        sermon.link || ""
                    )
                    : ""
            }"
            placeholder="https://youtube.com/..."
        >


        <button
            type="submit"
            class="form-btn"
        >
            ${
                sermon
                    ? "Update Sermon"
                    : "Add Sermon"
            }
        </button>


        <p
            class="form-message"
            id="editor-message"
        ></p>

    `;


    openModal(
        "editor-modal"
    );

}


/* =========================================================
   EDIT SERMON
========================================================= */

function editSermon(id) {

    const sermon =
        data.sermons.find(
            function (item) {

                return item.id == id;

            }
        );


    if (sermon) {

        openSermonEditor(
            sermon
        );

    }

}


/* =========================================================
   DELETE SERMON
========================================================= */

function deleteSermon(id) {

    if (
        !confirm(
            "Delete this sermon?"
        )
    ) {

        return;

    }


    data.sermons =
        data.sermons.filter(
            function (sermon) {

                return sermon.id != id;

            }
        );


    saveData();

    renderSermons();

    renderAdminSermons();

}


/* =========================================================
   CONTACT INFORMATION
========================================================= */

function renderContacts() {

    const location =
        getElement(
            "church-location"
        );

    const email =
        getElement(
            "church-email"
        );


    if (location) {

        location.textContent =
            data.contacts.location;

    }


    if (email) {

        email.textContent =
            data.contacts.email;

    }


    const container =
        getElement(
            "contacts-list"
        );


    if (!container) return;


    container.innerHTML = `

        <div class="contact-person">

            <div>

                <strong>
                    ${escapeHTML(
                        data.contacts.pastorName
                    )}
                </strong>

                <span>
                    Lead Pastor
                </span>

            </div>

            <a
                href="tel:${escapeAttribute(
                    data.contacts.pastorPhone
                )}"
            >
                ${escapeHTML(
                    formatPhone(
                        data.contacts.pastorPhone
                    )
                )}
            </a>

        </div>


        <div class="contact-person">

            <div>

                <strong>
                    ${escapeHTML(
                        data.contacts.secondName
                    )}
                </strong>

                <span>
                    Pastor
                </span>

            </div>

            <a
                href="tel:${escapeAttribute(
                    data.contacts.secondPhone
                )}"
            >
                ${escapeHTML(
                    formatPhone(
                        data.contacts.secondPhone
                    )
                )}
            </a>

        </div>


        <div class="contact-person">

            <div>

                <strong>
                    ${escapeHTML(
                        data.contacts.thirdName
                    )}
                </strong>

                <span>
                    Pastor
                </span>

            </div>

            <a
                href="tel:${escapeAttribute(
                    data.contacts.thirdPhone
                )}"
            >
                ${escapeHTML(
                    formatPhone(
                        data.contacts.thirdPhone
                    )
                )}
            </a>

        </div>

    `;

}


/* =========================================================
   LOAD CONTACT ADMIN FORM
========================================================= */

function loadContactForm() {

    const fields = {

        "admin-location":
            data.contacts.location,

        "admin-email":
            data.contacts.email,

        "admin-pastor-name":
            data.contacts.pastorName,

        "admin-pastor-phone":
            data.contacts.pastorPhone,

        "admin-second-name":
            data.contacts.secondName,

        "admin-second-phone":
            data.contacts.secondPhone,

        "admin-third-name":
            data.contacts.thirdName,

        "admin-third-phone":
            data.contacts.thirdPhone

    };


    Object.keys(fields)
        .forEach(
            function (id) {

                const element =
                    getElement(id);


                if (element) {

                    element.value =
                        fields[id] || "";

                }

            }
        );

}


/* =========================================================
   GIVING INFORMATION
========================================================= */

function renderGiving() {

    const supportName =
        getElement(
            "support-name"
        );

    const mtnNumber =
        getElement(
            "mtn-number"
        );

    const mtnAccount =
        getElement(
            "mtn-account"
        );

    const airtelNumber =
        getElement(
            "airtel-number"
        );

    const airtelAccount =
        getElement(
            "airtel-account"
        );


    if (supportName) {

        supportName.textContent =
            data.giving.supportName;

    }


    if (mtnNumber) {

        mtnNumber.textContent =
            formatPhone(
                data.giving.mtnNumber
            );

        mtnNumber.href =
            "tel:" +
            data.giving.mtnNumber;

    }


    if (mtnAccount) {

        mtnAccount.textContent =
            data.giving.mtnAccount;

    }


    if (airtelNumber) {

        airtelNumber.textContent =
            formatPhone(
                data.giving.airtelNumber
            );

        airtelNumber.href =
            "tel:" +
            data.giving.airtelNumber;

    }


    if (airtelAccount) {

        airtelAccount.textContent =
            data.giving.airtelAccount;

    }

}


/* =========================================================
   LOAD GIVING ADMIN FORM
========================================================= */

function loadGivingForm() {

    const fields = {

        "admin-support-name":
            data.giving.supportName,

        "admin-mtn-number":
            data.giving.mtnNumber,

        "admin-mtn-account":
            data.giving.mtnAccount,

        "admin-airtel-number":
            data.giving.airtelNumber,

        "admin-airtel-account":
            data.giving.airtelAccount

    };


    Object.keys(fields)
        .forEach(
            function (id) {

                const element =
                    getElement(id);


                if (element) {

                    element.value =
                        fields[id] || "";

                }

            }
        );

}


/* =========================================================
   SUPPORT SUBMISSIONS
========================================================= */

function renderSupportSubmissions() {

    const container =
        getElement(
            "support-submissions-list"
        );


    if (!container) return;


    if (!data.submissions.length) {

        container.innerHTML = `

            <div class="empty">

                No support submissions yet.

            </div>

        `;

        return;

    }


    container.innerHTML =
        data.submissions
            .map(
                function (submission) {

                    const statusClass =
                        submission.status ===
                        "Received"
                            ? "received"
                            : "pending";


                    let proofHTML =
                        "<p><strong>Proof:</strong> Not uploaded</p>";


                    /*
                       Display uploaded proof.
                    */

                    if (
                        submission.proof &&
                        submission.proof.data
                    ) {

                        const proofData =
                            submission.proof.data;


                        if (
                            submission.proof.type &&
                            submission.proof.type
                                .startsWith("image/")
                        ) {

                            proofHTML = `

                                <p>
                                    <strong>
                                        Proof:
                                    </strong>
                                    ${
                                        escapeHTML(
                                            submission.proof.name
                                        )
                                    }
                                </p>

                                <img
                                    src="${proofData}"
                                    alt="Support proof"
                                    class="support-proof-preview"
                                    onclick="viewSupportProof(${submission.id})"
                                >

                                <p>
                                    <button
                                        type="button"
                                        class="edit-btn"
                                        onclick="viewSupportProof(${submission.id})"
                                    >
                                        View Proof
                                    </button>
                                </p>

                            `;

                        } else {

                            proofHTML = `

                                <p>
                                    <strong>
                                        Proof:
                                    </strong>
                                    ${
                                        escapeHTML(
                                            submission.proof.name
                                        )
                                    }
                                </p>

                                <p>

                                    <button
                                        type="button"
                                        class="edit-btn"
                                        onclick="viewSupportProof(${submission.id})"
                                    >
                                        View / Open Proof
                                    </button>

                                </p>

                            `;

                        }

                    } else if (
                        submission.proof &&
                        typeof submission.proof ===
                        "string"
                    ) {

                        proofHTML = `

                            <p>
                                <strong>
                                    Proof:
                                </strong>
                                ${escapeHTML(
                                    submission.proof
                                )}
                            </p>

                            <p>
                                <small>
                                    This proof was submitted
                                    before the new proof system
                                    was installed.
                                </small>
                            </p>

                        `;

                    }


                    const noteHTML =
                        submission.note
                            ? `
                                <p>
                                    <strong>
                                        Note:
                                    </strong>
                                    ${escapeHTML(
                                        submission.note
                                    )}
                                </p>
                              `
                            : "";


                    return `

                        <div class="admin-item">

                            <div>

                                <h4>
                                    ${escapeHTML(
                                        submission.name
                                    )}
                                </h4>


                                <p>
                                    <strong>
                                        Phone:
                                    </strong>
                                    ${escapeHTML(
                                        submission.phone
                                    )}
                                </p>


                                <p>
                                    <strong>
                                        Amount:
                                    </strong>
                                    UGX
                                    ${escapeHTML(
                                        submission.amount
                                    )}
                                </p>


                                <p>
                                    <strong>
                                        Network:
                                    </strong>
                                    ${escapeHTML(
                                        submission.network
                                    )}
                                </p>


                                <p>
                                    <strong>
                                        Date:
                                    </strong>
                                    ${escapeHTML(
                                        submission.date
                                    )}
                                </p>


                                ${proofHTML}


                                ${noteHTML}


                                <span
                                    class="status ${statusClass}"
                                >
                                    ${escapeHTML(
                                        submission.status
                                    )}
                                </span>

                            </div>


                            <div class="item-actions">

                                ${
                                    submission.status !==
                                    "Received"
                                        ? `
                                            <button
                                                class="received-btn"
                                                onclick="markSupportReceived(${submission.id})"
                                            >
                                                Received
                                            </button>
                                          `
                                        : ""
                                }


                                <button
                                    class="delete-btn"
                                    onclick="deleteSupportSubmission(${submission.id})"
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    `;

                }
            )
            .join("");

}


/* =========================================================
   VIEW SUPPORT PROOF
========================================================= */

function viewSupportProof(id) {

    const submission =
        data.submissions.find(
            function (item) {

                return item.id == id;

            }
        );


    if (
        !submission ||
        !submission.proof ||
        !submission.proof.data
    ) {

        alert(
            "The proof file is not available."
        );

        return;

    }


    const proof =
        submission.proof;


    /*
       Open proof in a new browser tab.
    */

    const newWindow =
        window.open(
            "",
            "_blank"
        );


    if (!newWindow) {

        alert(
            "Your browser blocked the proof window. " +
            "Please allow pop-ups for this website."
        );

        return;

    }


    if (
        proof.type &&
        proof.type.startsWith(
            "image/"
        )
    ) {

        newWindow.document.write(`

            <!DOCTYPE html>

            <html>

            <head>

                <title>
                    Support Proof
                </title>

                <style>

                    body {
                        margin: 0;
                        padding: 20px;
                        background: #111;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        min-height: 100vh;
                    }

                    img {
                        max-width: 100%;
                        max-height: 95vh;
                        object-fit: contain;
                    }

                </style>

            </head>

            <body>

                <img
                    src="${proof.data}"
                    alt="Support proof"
                >

            </body>

            </html>

        `);

    } else {

        newWindow.location.href =
            proof.data;

    }

}


/* =========================================================
   MARK SUPPORT RECEIVED
========================================================= */

function markSupportReceived(id) {

    const submission =
        data.submissions.find(
            function (item) {

                return item.id == id;

            }
        );


    if (!submission) return;


    submission.status =
        "Received";


    saveData();

    renderSupportSubmissions();

}


/* =========================================================
   DELETE SUPPORT RECORD
========================================================= */

function deleteSupportSubmission(id) {

    if (
        !confirm(
            "Delete this support record?"
        )
    ) {

        return;

    }


    data.submissions =
        data.submissions.filter(
            function (submission) {

                return submission.id != id;

            }
        );


    saveData();

    renderSupportSubmissions();

}


/* =========================================================
   PHONE FORMAT
========================================================= */

function formatPhone(phone) {

    if (!phone) return "";


    const clean =
        String(phone).replace(
            /\D/g,
            ""
        );


    if (clean.length === 10) {

        return (
            clean.substring(0, 4) +
            " " +
            clean.substring(4, 7) +
            " " +
            clean.substring(7)
        );

    }


    return phone;

}


/* =========================================================
   SAFE LINK
========================================================= */

function safeLink(link) {

    if (!link) {

        return "#";

    }


    const value =
        String(link).trim();


    /*
       Allow normal website links,
       internal anchors and telephone links.
    */

    if (
        value.startsWith("#") ||
        value.startsWith("/") ||
        value.startsWith("./") ||
        value.startsWith("../") ||
        value.startsWith("https://") ||
        value.startsWith("http://") ||
        value.startsWith("tel:")
    ) {

        return escapeAttribute(
            value
        );

    }


    return "#";

}


/* =========================================================
   EXTERNAL LINK CHECK
========================================================= */

function isExternalLink(link) {

    if (!link) return false;


    return (
        link.startsWith(
            "https://"
        ) ||
        link.startsWith(
            "http://"
        )
    );

}


/* =========================================================
   HTML ESCAPING
========================================================= */

function escapeHTML(value) {

    if (
        value === undefined ||
        value === null
    ) {

        return "";

    }


    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


/* =========================================================
   ATTRIBUTE ESCAPING
========================================================= */

function escapeAttribute(value) {

    return escapeHTML(
        value
    );

}


/* =========================================================
   MAKE FUNCTIONS AVAILABLE TO HTML
========================================================= */

window.editEvent =
    editEvent;

window.deleteEvent =
    deleteEvent;

window.editSermon =
    editSermon;

window.deleteSermon =
    deleteSermon;

window.markSupportReceived =
    markSupportReceived;

window.deleteSupportSubmission =
    deleteSupportSubmission;

window.viewSupportProof =
    viewSupportProof;

window.openModal =
    openModal;

window.closeModal =
    closeModal;

window.openAdminPanel =
    openAdminPanel;

window.closeAdminPanel =
    closeAdminPanel;

window.openEventEditor =
    openEventEditor;

window.openSermonEditor =
    openSermonEditor;


/* =========================================================
   END OF SCRIPT
========================================================= */
