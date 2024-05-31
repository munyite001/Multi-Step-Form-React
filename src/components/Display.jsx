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

    //  Add-ons
    const [addOns, setAddOns] = useState({
        onlineService: false,
        largerStorage: false,
        customizableProfile: false
    })

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

    const planCosts = {
        monthly: [9, 12, 15], // Costs for Arcade, Advanced, Pro monthly
        yearly: [90, 120, 150] // Costs for Arcade, Advanced, Pro yearly
    };
    
    const addOnCosts = {
        monthly: {
            onlineService: 1,
            largerStorage: 2,
            customizableProfile: 2
        },
        yearly: {
            onlineService: 10,
            largerStorage: 20,
            customizableProfile: 20
        }
    };
    
    const calculateTotalPrice = () => {
        const planCost = subScriptionType === 0 ? planCosts.monthly[plan] : planCosts.yearly[plan];
        const addOnCost = Object.keys(addOns).reduce((acc, key) => {
            return acc + (addOns[key] ? (subScriptionType === 0 ? addOnCosts.monthly[key] : addOnCosts.yearly[key]) : 0);
        }, 0);
        return planCost + addOnCost;
    };
    


    //  Function to toggle add-ons
    const handleToggleAddOn = (e) => {
        const id = e.currentTarget.getAttribute("data-id");

        setAddOns((prev) => {
            return {
                ...prev,
                [id]: !prev[id]
            }
        })

        
    }

    //  Success 
    const [success, setSuccess] = useState(false)

    const handleSuccess = () => {
        const errors = validateForm();

        if (Object.keys(errors).length === 0) {
            setSuccess(true)
        } else { 
            setActive(1)
        }

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
                return (
                    <div className="display-box add-ons">
                        <h2>Pick add-ons</h2>
                        <p>Add-ons help enhance your gaming experience</p>
                        <div className="add-ons-container">
                            <div className={addOns["onlineService"] ? "add-on-box selected":"add-on-box"}  data-id="onlineService" onClick={handleToggleAddOn}>
                                <div className="check-box">
                                    <img src="/assets/images/icon-checkmark.svg" alt="" />
                                </div>
                                <div className="text-box">
                                    <h4>Online Service</h4>
                                    <p>Access to multiplayer games</p>
                                </div>
                                <div className="price">{subScriptionType == 0 ? "+$1/mo" : "+$10/yr"}</div>
                            </div>
                            <div className={addOns["largerStorage"] ? "add-on-box selected":"add-on-box"} data-id="largerStorage" onClick={handleToggleAddOn}>
                                <div className="check-box">
                                    <img src="/assets/images/icon-checkmark.svg" alt="" />
                                </div>
                                <div className="text-box">
                                    <h4>Larger Storage</h4>
                                    <p>Extra 1TB of cloud save</p>
                                </div>
                                <div className="price">{subScriptionType == 0 ? "+$2/mo" : "+$20/yr"}</div>
                            </div>
                            <div className={addOns["customizableProfile"] ? "add-on-box selected":"add-on-box"} data-id="customizableProfile" onClick={handleToggleAddOn}>
                                <div className="check-box">
                                    <img src="/assets/images/icon-checkmark.svg" alt="" />
                                </div>
                                <div className="text-box">
                                    <h4>Customizable Profile</h4>
                                    <p>Custom theme on your profile</p>
                                </div>
                                <div className="price">{subScriptionType == 0 ? "+$2/mo" : "+$20/yr"}</div>
                            </div>
                        </div>
                        <div className="display-footer">
                            <button className="btn-2" onClick={() => setActive((prev) => prev - 1)}>Go Back</button>
                            <button className="btn" onClick={() => setActive((prev) => prev + 1)}>Next Step</button>
                        </div>
                    </div>
                )
                case 4:
                    const totalPrice = calculateTotalPrice();
                    return (
                        !success ? (
                            <div className="display-box finalize">
                                <h2>Finishing up</h2>
                                <p>Double-check everything looks OK before confirming</p>
                                <div className="finalize-box">
                                    <div className="plan-confirmation">
                                        <div className="text-box">
                                            <div className="text-wrapper">
                                                <h4>{plan == 0 ? "Arcade" : plan == 1 ? "Advanced" : "Pro"} ({subScriptionType == 0 ? "Monthly" : "Yearly"})</h4>
                                            </div>
                                            <button className="btn-2" style={{textDecoration: "underline"}} onClick={() => {setActive(2)}}>Change</button>
                                        </div>
                                        <div className="price">
                                            {plan == 0 ? subScriptionType == 0 ? "$9/mo" : "$90/yr" : plan == 1 ? subScriptionType == 0 ? "$12/mo" : "$120/yr" : subScriptionType == 0 ? "$15/mo" : "$150/yr"}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="add-ons-confirmation">
                                        {addOns["onlineService"] && 
                                        <div className="add-on-selected">
                                            <h4>Online Service</h4>
                                            <div className="price">{subScriptionType == 0 ? "+$1/mo" : "+$10/yr"}</div>
                                        </div>}
                                        {addOns["largerStorage"] && 
                                        <div className="add-on-selected">
                                            <h4>Larger Storage</h4>
                                            <div className="price">{subScriptionType == 0 ? "+$2/mo" : "+$20/yr"}</div>
                                        </div>}
                                        {addOns["customizableProfile"] && 
                                        <div className="add-on-selected">
                                            <h4>Customizable Profile</h4>
                                            <div className="price">{subScriptionType == 0 ? "+$2/mo" : "+$20/yr"}</div>
                                        </div>}
                                    </div>
                                </div>
                                <div className="total-price">
                                    <h4>Total (per {subScriptionType == 0 ? "month" : "year"})</h4>
                                    <div className="price">{subScriptionType == 0 ? `$${totalPrice}/mo` : `$${totalPrice}/yr`}</div>
                                </div>
                                <div className="display-footer">
                                    <button className="btn-2" onClick={() => setActive((prev) => prev - 1)}>Go Back</button>
                                    <button className="btn" onClick={handleSuccess}>Next Step</button>
                                </div>
                            </div>
                        ) : (
                            <div className="display-box">
                                <div className="success-container">
                                    <img src="/assets/images/icon-thank-you.svg" alt="" />
                                    <h1>Thank You</h1>
                                    <p>Thanks for confirming your subscription!
                                        We hope you have fun using our platform
                                        if you have any questions, feel free to contact us
                                        at support@loregaming.com

                                    </p>
                                </div>
                            </div>
                        )
                    );                
        }
    }
    return(
        <div className="display">
            {renderConent()}
        </div>
    )
}