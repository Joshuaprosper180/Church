/* =========================================================
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
