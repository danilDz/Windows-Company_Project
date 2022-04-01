const modals = () => {
    function bindModal(triggerSelector, modalSelector, closeSelector) {

        const modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector);

        if (triggerSelector === '') {
            modal.style.display = 'block';
            document.body.classList.add('modal-open')
        } else {
            const trigger = document.querySelectorAll(triggerSelector)
            trigger.forEach(item => {
                item.addEventListener('click', (e) => {
                    if (e.target) {
                        e.preventDefault()                
                    }
                    modal.style.display = 'block';
                    document.body.classList.add('modal-open')
                })
            })
        }

        close.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.classList.remove('modal-open')
        })

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.classList.remove('modal-open')
            }
        })
    }

    setTimeout(() => {
        bindModal('', '.popup', '.popup .popup_close')
    }, 60000)
    
    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close')
    bindModal('.phone_link', '.popup', '.popup .popup_close')
}

export default modals;