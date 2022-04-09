const forms = () => {
    const form = document.querySelectorAll('form'),
          input = document.querySelectorAll('input'),
          phoneInputs = document.querySelectorAll('input[name="user_phone"]')

    phoneInputs.forEach(item => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/\D/, '')
        })
    })

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
            
            postData('assets/server.php', formData).then(res => {
                console.log(res)
                statusMessage.textContent = messages.success
            }).catch(err => {
                statusMessage.textContent = messages.failure
            }).finally(() => {
                clearInputs()
                setTimeout(() => {
                    statusMessage.remove()
                }, 3000)
            })
        })
    })
}

export default forms