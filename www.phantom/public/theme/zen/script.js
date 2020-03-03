Vue.filter('timeAgo', function(value) {
    let minute = 60,
        hour = 3600,
        day = 86400,
        month = 2592000,
        year = 31536000,
        elapsed = Math.floor((Date.now() - new Date(value)) / 1000);

    if (elapsed < minute) {
        return 'just now';
    }

    let a = elapsed < hour  && [Math.floor(elapsed / minute), 'minute'] ||
        elapsed < day   && [Math.floor(elapsed / hour), 'hour']     ||
        elapsed < month && [Math.floor(elapsed / day), 'day']       ||
        elapsed < year  && [Math.floor(elapsed / month), 'month']   ||
        [Math.floor(elapsed / year), 'year'];

    return a[0] + ' ' + a[1] + (a[0] === 1 ? '' : 's') + " ago";
});