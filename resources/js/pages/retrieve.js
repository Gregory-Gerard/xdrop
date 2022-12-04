export default function () {

    document.querySelector('pre')?.addEventListener('click', e => {
        const el = e.target.closest('pre');

        if (document.body.createTextRange) {
            const range = document.body.createTextRange();
            range.moveToElementText(el);
            range.select();
        } else if (window.getSelection) {
            const selection = window.getSelection();
            const range = document.createRange();
            range.selectNodeContents(el);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    });
}
