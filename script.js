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
            link: "#watch-sermon"
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
    deleteSupportSubmission;
