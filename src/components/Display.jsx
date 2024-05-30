import { useState } from "react"

export default function Display({ active, setActive }) {

    const [ formData, setFormData ] = useState({
        name: "",
        email: "",
        phone: ""
    })


    //  Form Validation Errors
    const [ errors, setErrors ] = useState({})
    const [showErrors, setShowErrors] = useState(false);


    //  Toggle Subscription Type
    const [subScriptionType, setSubScriptionType] = useState(0)

    //  Plan
    const [plan, setPlan] = useState(0)

    //  Function to validate the form, make sure there are no errors
    const validateForm = () => {
        const newErrors = {}

        if (!formData.name) {
            newErrors.name = "Name is required"
        }
        if (!formData.email) {
            newErrors.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid"
        }
        if (!formData.phone) {
            newErrors.phone = "Phone is required"
        }

        return newErrors
    }


    //  Function to keep track of form inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => {
            return {
                ...prevData,
                [name]: value
            }
        })
    }

    //  Function to check wether the user has filled current page correctly
    const handleNextStep = () => {
        const newErrors = validateForm();

        if (Object.keys(newErrors).length === 0) {
            //  No errors proceed to the next step
            setActive((prev) => {
                if (prev < 4) {
                    return prev + 1
                }
            })
            
        } else {
            //  Set errors to state and display them
            setErrors(newErrors)
            setShowErrors(true)

            setTimeout(() => {
                setShowErrors(false)
            }, 3000)
        }
    }

    //  Function to toggle subscription change from monthly to yearly
    const handleSubscriptionChange = () => {
        setSubScriptionType((prev) => {
            return prev === 0 ? 1 : 0;
        });
    };

    //  Function to change plan
    const handlePlanChange = (val) => {
        setPlan(val)
    }
    

    const renderConent = () => {
        switch(active) {
            case 1:
                return (
                    <div className="display-box personal-info">
                        <h2>Personal info</h2>
                        <p>Please provide your name, email, address, and phone number </p>
                        <form>
                            <div className="input-box">
                                <label htmlFor="name">Name</label> {showErrors && errors.name && <span className="error">{errors.name}</span>}
                                <input 
                                    type="text" 
                                    placeholder="Name" 
                                    id="name" 
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className={showErrors && errors.name && "error-border"}
                                    />
                            </div>
                            <div className="input-box">
                                <label htmlFor="email">Email Address</label> {showErrors &&  errors.email && <span className="error">{errors.email}</span>}
                                <input 
                                    type="email" 
                                    placeholder="Email" 
                                    id="email" 
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={showErrors && errors.email && "error-border"}
                                    />
                            </div>
                            <div className="input-box">
                                <label htmlFor="phone">Phone Number</label> {showErrors && errors.phone && <span className="error">{errors.phone}</span>}
                                <input 
                                    type="text" 
                                    placeholder="e.g. +1 234 567 890" 
                                    name="phone" 
                                    id="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className={showErrors && errors.phone && "error-border"}
                                    />
                            </div>
                        </form>
                        <div className="display-footer">
                            <button className="btn" onClick={handleNextStep}>Next Step</button>
                        </div>
                    </div>
                )
            case 2:
                return (
                    <div className="display-box plan">
                        <h2>Select your plan</h2>
                        <p>You have the option of monthly or yearly billing</p>
                        <div className="plan-container">
                            <div onClick={() => handlePlanChange(0)} className={plan == 0 ? "plan-box selected-plan":"plan-box"}>
                                <img src="/assets/images/icon-arcade.svg" alt="Arcade"/>
                                <div className="text">
                                    <h4>Arcade</h4>
                                    <span className="price">{subScriptionType == 0 ? "$9/mo" : "$90/yr"}</span>
                                    {/* {subScriptionType == 1 && <span className="blue-free">2 months free</span>} */}
                                </div>
                            </div>
                            <div onClick={() => handlePlanChange(1)} className={plan == 1 ? "plan-box selected-plan":"plan-box"}>
                                <img src="/assets/images/icon-advanced.svg" alt="Advanced"/>
                                <div className="text">
                                    <h4>Advanced</h4>
                                    <span className="price">{subScriptionType == 0 ? "$12/mo" : "$120/yr"}</span>
                                    {/* {subScriptionType == 1 && <span className="blue-free">2 months free</span>} */}
                                </div>
                            </div>
                            <div onClick={() => handlePlanChange(2)} className={plan == 2 ? "plan-box selected-plan":"plan-box"}>
                                <img src="/assets/images/icon-pro.svg" alt="Pro"/>
                                <div className="text">
                                    <h4>Pro</h4>
                                    <span className="price">{subScriptionType == 0 ? "$15/mo" : "$150/yr"}</span>
                                    {/* {subScriptionType == 1 && <span className="blue-free">2 months free</span>} */}
                                </div>
                            </div>
                        </div>
                        <div className="subscription-type">
                                <p className={subScriptionType == 0 ? "blue-text":""}>Monthly</p>
                                <input type="range" min={0} max={1} className="subscription-range" onChange={handleSubscriptionChange} value={subScriptionType}/>
                                <p className={subScriptionType == 0 ? "":"blue-text"}>Yearly</p>
                        </div>
                        <div className="display-footer">
                            <button className="btn-2" onClick={() => setActive((prev) => prev - 1)}>Go Back</button>
                            <button className="btn" onClick={() => setActive((prev) => prev + 1)}>Next Step</button>
                        </div>
                    </div>
                )
            case 3:
                return <h1>Page 3</h1>
            case 4:
                return <h1>Page 4</h1>
        }
    }
    return(
        <div className="display">
            {renderConent()}
        </div>
    )
}