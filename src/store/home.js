const home = {
	state: {
    phoneId: '',
    step:0
	},
	mutations: {
		setPhoneId (state,i) {
      state.phoneId = i
    },
    setStep (state,s) {
      state.step = s
    },
	}
}

export default home
