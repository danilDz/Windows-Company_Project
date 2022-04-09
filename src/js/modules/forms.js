import checkNumInputs from "./checkNumInputs";

const forms = (state) => {
    const form = document.querySelectorAll('form'),
          input = document.querySelectorAll('input');

    checkNumInputs('input[name="user_phone"]')

    const messages = {
        loading: 'Loading...',
        success: 'Thanks! We`ll call you soon!',
        failure: 'Something went wrong!'
    }

    const postData = async (url, data) => {
        document.querySelector('.status').textContent = messages.loading
        let res = await fetch(url, {
            method: 'POST',
            body: data
        })

        return await res.text()
    }

    const clearInputs = () => {
        input.forEach(item => {
            item.value = ''
        })
    }

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault()

            let statusMessage = document.createElement('div')
            statusMessage.classList.add('status')
            item.appendChild(statusMessage)

            const formData = new FormData(item)
            if (item.getAttribute('data-calc') === 'end') {
                for (let key in state) {
                    formData.append(key, state[key])
                }
            }
            
            postData('assets/server.php', formData).then(res => {
                console.log(res)
                statusMessage.textContent = messages.success
            }).catch(err => {
                statusMessage.textContent = messages.failure
            }).finally(() => {
                clearInputs()
                setTimeout(() => {
                    statusMessage.remove();
                    document.querySelectorAll('[data-modal]').forEach(modal => {
                        modal.style.display = 'none'
                    });
                    document.body.classList.remove('modal-open');
                }, 3000)
            })
        })
    })
}

export default forms