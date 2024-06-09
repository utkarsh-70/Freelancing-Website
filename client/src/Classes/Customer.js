class Customer {
    constructor(jsonObject) {
        this.id = jsonObject._id;
        this.fname = jsonObject.fname;
        this.lname = jsonObject.lname;
        this.email = jsonObject.email;
        this.password = jsonObject.password;
        this.address = jsonObject.address;
        this.city = jsonObject.city;
        this.state = jsonObject.state;
        this.pincode = jsonObject.pincode;
        this.mobile = jsonObject.mobile;
        this.aadhaar = jsonObject.aadhaar;
        this.tstart = jsonObject.tstart;
        this.className = "Customer";
    }
}

export default Customer;