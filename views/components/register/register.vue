<template src="./register.html"> </template>
<script>
// eslint-disable-next-line no-unused-vars
import axios from 'axios'
import sha512 from 'js-sha512'
import UserService from '@/api/services/user.service.js'

// import Config from '~/config/config.js'
export default {
  data() {
    return {
      err: {
        email: '',
        img: '',
        pwd: '',
        dob: '',
        address: '',
        number: '',
        pwd2: ''
      },
      rules: {
        required: (value) => !!value || 'Required.',
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        }
      },
      email: '',
      image: null,
      phoneNumber: null,
      dob: '1990-01-01',
      address: '',
      password: '',
      password2: '',
      dobTrigger: false
    }
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.dob)
    }
  },
  methods: {
    setupImage(e) {
      this.image = e
    },
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    submitHandle() {
      let error = false
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (!this.email) {
        this.err.email = 'email is required'
        error = true
      }
      if (!pattern.test(this.email)) {
        console.log(this.email)
        this.err.email = 'email is not valied'
        error = true
      }
      if (!this.phoneNumber) {
        this.err.number = 'Phone Number is required'
        error = true
      }
      if (!this.image) {
        this.err.img = 'Profile picture is required'
        error = true
      }
      if (String(this.phoneNumber).length !== 10) {
        console.log(String(this.phoneNumber).length)
        this.err.number = 'phone number is not valied'
        error = true
      }
      if (!this.dob) {
        this.err.dob = 'DOB is required'
        error = true
      }
      if (!this.address) {
        this.err.address = 'address is required'
        error = true
      }
      if (!this.password) {
        this.err.pwd = 'Password is required'
        error = true
      }
      if (this.password !== this.password2) {
        this.err.pwd2 = 'Password dosent match'
        error = true
      }
      if (error) {
        console.log(this.err)
      } else {
        this.save()
        this.err = {
          email: '',
          img: '',
          pwd: '',
          dob: '',
          address: '',
          number: '',
          pwd2: ''
        }
      }
    },
    redirect() {
      setTimeout(() => {
        this.$router.push('/profile')
      }, 1000)
    },
    async save() {
      try {
        const hash = sha512.update(this.password)
        // const config = new Config()
        const form = new FormData()
        form.append('img', this.image, this.image.name)
        form.append('email', this.email)
        form.append('password', hash.hex())
        form.append('dob', this.dob)
        form.append('address', this.address)
        form.append('phoneNumber', this.phoneNumber)
        const res = await UserService.register(form)
        await this.$store.dispatch('auth/getUserData', res.data.data._id)
        this.redirect()
      } catch (err) {
        this.$store.dispatch('error/update', err)
        console.log(err)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import './register.scss';
</style>
