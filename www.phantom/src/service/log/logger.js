const logger = {
    createEvent: function(name, info) {
        return new Promise((resolve, reject) => {
            let event = {
                name: name,
                info: info,
                created: (new Date).toISOString()
            };

            let events = localStorage.getItem('events');
            events = events ? JSON.parse(events) : [];
            events.unshift(event);
            events = events.slice(0, 250);

            localStorage.setItem('events', JSON.stringify(events));
            resolve(events);
        });
    },
    getEvents: function() {
        return new Promise((resolve, reject) => resolve(JSON.parse(localStorage.getItem('events'))));
    },
    clear: function() {
        let clearEvent = [{
            name: 'log',
            info: 'Event log cleared',
            created: (new Date).toISOString()
        }];

        localStorage.setItem('events', JSON.stringify(clearEvent))

        return new Promise((resolve, reject) => resolve(clearEvent));
    }
};

export default logger;