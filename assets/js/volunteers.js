(function() {
    document.addEventListener('DOMContentLoaded', function() {
        const copyEmailBtn = document.getElementById('copyEmailBtn');
        copyEmailBtn.addEventListener('click', copyEmailToClipboard);
    });

    function copyEmailToClipboard() {
        const email = "volunteers@orlandocodecamp.com";
        if(!navigator.clipboard) {
            alert("Copying to clipboard is not supported in this browser.");
            return;
        }
        navigator.clipboard.writeText(email)
            .then(() => {
                const toast = document.getElementById('toast');
                toast.classList.add('show');
                setTimeout(() => {
                    toast.classList.remove('show');
                }, 3000);
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    }
})();
