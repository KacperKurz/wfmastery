import React, {useState} from "react"
import {connect} from "react-redux"
import WarframeSelectors from "../../state/ducks/warframes/selectors";
import warframeActions from "../../state/ducks/warframes/actions";
import weaponActions from "../../state/ducks/weapons/actions";
import WeaponsSelectors from "../../state/ducks/weapons/selectors";
import {Navbar,Nav, NavDropdown, Form, Button, Container, Row, Col, Card, Modal, Image} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom"


function Homepage({weapons, warframes, addWarframe, deleteWarframe, addWeapon, deleteWeapon, editWarframe, editWeapon}){
    const [category,setCategory] = useState("warframes")
    const [warframePopup, setWarframePopup] = useState(false)
    const [warframePopupContent, setWarframePopupContent] = useState({})
    const [weaponPopup, setWeaponPopup] = useState(false)
    const [weaponPopupContent, setWeaponPopupContent] = useState({})
    const [addWarframePopup, setAddWarframePopup] = useState(false)
    const [addWarframePopupContent, setAddWarframePopupContent] = useState({abilities: [{},{},{},{}]})
    const [addWeaponPopup, setAddWeaponPopup] = useState(false)
    const [addWeaponPopupContent, setAddWeaponPopupContent] = useState({})
    const [editWarframePopup, setEditWarframePopup] = useState(false)
    const [editWarframePopupContent, setEditWarframePopupContent] = useState({})
    const [editWeaponPopup, setEditWeaponPopup] = useState(false)
    const [editWeaponPopupContent, setEditWeaponPopupContent] = useState({})

    function WarframeModal(props) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {props.content.name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>{props.content.description}</h4>
                    <Row>
                        <Col>
                            <p><h5>Health: </h5>{props.content.health}</p>
                            <p><h5>Shields: </h5>{props.content.shield}</p>
                            <p><h5>Armour: </h5>{props.content.armor}</p>
                            <p><h5>Power: </h5>{props.content.power}</p>
                            <p><h5>Sprint speed: </h5>{props.content.sprintSpeed}</p>
                            <p><h5>Owned: </h5>{String(props.content.owned)}</p>
                            <p><h5>Mastered: </h5>{String(props.content.mastered)}</p>
                            <Image src={props.content.wikiaThumbnail!==undefined?props.content.wikiaThumbnail.slice(0,-34):""}/>
                        </Col>
                        {props.content.abilities!==undefined?<Col>
                                <h4>Abilities:</h4>
                                <p><h5>Passive: </h5>{props.content.passiveDescription}</p>
                                <p><h5>{props.content.abilities[0].name}: </h5>{props.content.abilities[0].description}</p>
                                <p><h5>{props.content.abilities[1].name}: </h5>{props.content.abilities[1].description}</p>
                                <p><h5>{props.content.abilities[2].name}: </h5>{props.content.abilities[2].description}</p>
                                <p><h5>{props.content.abilities[3].name}: </h5>{props.content.abilities[3].description}</p>
                            </Col>:<></>}

                    </Row>

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={()=>{
                        setWarframePopup(false)
                        setWarframePopupContent({})
                        deleteWarframe(props.content.name)
                    }}>Delete</Button>
                    <Button onClick={()=>{setEditWarframePopup(true);setEditWarframePopupContent(warframePopupContent)}}>Edit</Button>
                    <Button href={props.content.wikiaUrl!==undefined?props.content.wikiaUrl:""} disabled={props.content.wikiaUrl===undefined}>Wiki page</Button>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    function AddWarframeModal(props) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Form>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            <Form.Group controlId={"name"}>
                                <Form.Control type={"text"} placeholder={"Name"} required onChange={(e)=>{
                                    let warframe = addWarframePopupContent;
                                    warframe.name=e.target.value
                                    setAddWarframePopupContent(warframe)
                                }}/>
                            </Form.Group>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId={"description"}>
                            <Form.Control as="textarea" rows={3} placeholder={"Description"} onChange={(e)=>{
                                let warframe = addWarframePopupContent
                                warframe.description=e.target.value
                                setAddWarframePopupContent(warframe)
                            }}/>
                        </Form.Group>
                        <Row>
                            <Col>
                                <Form.Group controlId={"health"}>
                                    <Form.Row>
                                        <Col><h5>Health: </h5></Col>
                                        <Col><Form.Control type={"text"} placeholder={"Health"} required onChange={(e)=>{
                                            let warframe = addWarframePopupContent
                                            warframe.health=e.target.value
                                            setAddWarframePopupContent(warframe)
                                        }}/></Col>
                                    </Form.Row>
                                </Form.Group>
                                <Form.Group controlId={"shields"}>
                                    <Form.Row>
                                        <Col><h5>Shields: </h5></Col>
                                        <Col><Form.Control type={"text"} placeholder={"Shields"} required onChange={(e)=>{
                                            let warframe = addWarframePopupContent
                                            warframe.shield=e.target.value
                                            setAddWarframePopupContent(warframe)
                                        }}/></Col>
                                    </Form.Row>
                                </Form.Group>
                                <Form.Group controlId={"armour"}>
                                    <Form.Row>
                                        <Col><h5>Armour: </h5></Col>
                                        <Col><Form.Control type={"text"} placeholder={"Armour"} required onChange={(e)=>{
                                            let warframe = addWarframePopupContent
                                            warframe.armor=e.target.value
                                            setAddWarframePopupContent(warframe)
                                        }}/></Col>
                                    </Form.Row>
                                </Form.Group>
                                <Form.Group controlId={"power"}>
                                    <Form.Row>
                                        <Col><h5>Power: </h5></Col>
                                        <Col><Form.Control type={"text"} placeholder={"Shields"} required onChange={(e)=>{
                                            let warframe = addWarframePopupContent
                                            warframe.power=e.target.value
                                            setAddWarframePopupContent(warframe)
                                        }}/></Col>
                                    </Form.Row>
                                </Form.Group>
                                <Form.Group controlId={"sprintSpeed"}>
                                    <Form.Row>
                                        <Col><h5>Sprint speed: </h5></Col>
                                        <Col><Form.Control type={"text"} placeholder={"Sprint speed"} required onChange={(e)=>{
                                            let warframe = addWarframePopupContent
                                            warframe.sprintSpeed=e.target.value
                                            setAddWarframePopupContent(warframe)
                                        }}/></Col>
                                    </Form.Row>
                                </Form.Group>
                                <Form.Group controlId={"owned"}>
                                    <Form.Check type={"switch"} label={"Owned"} onChange={e=>{
                                        let warframe = addWarframePopupContent
                                        warframe.owned=e.target.checked
                                        setAddWarframePopupContent(warframe)
                                    }}/>
                                </Form.Group>
                                <Form.Group controlId={"mastered"}>
                                    <Form.Check type={"switch"} label={"Mastered"} onChange={e=>{
                                        let warframe = addWarframePopupContent
                                        warframe.mastered=e.target.checked
                                        setAddWarframePopupContent(warframe)
                                    }}/>
                                </Form.Group>
                                <Form.Group controlId={"image"}>
                                        <Col><Form.Control type={"text"} placeholder={"Image url"} onChange={(e)=>{
                                            let warframe = addWarframePopupContent
                                            warframe.wikiaThumbnail=e.target.value
                                            setAddWarframePopupContent(warframe)
                                        }}/></Col>
                                </Form.Group>
                                <Form.Group controlId={"wikia"}>
                                    <Col><Form.Control type={"text"} placeholder={"Wiki url"} onChange={(e)=>{
                                        let warframe = addWarframePopupContent
                                        warframe.wikiaUrl=e.target.value
                                        setAddWarframePopupContent(warframe)
                                    }}/></Col>
                                </Form.Group>
                            </Col>
                            <Col>
                                <h4>Abilities:</h4>
                                <Form.Group controlId={"passive"}>
                                    <h5>Passive: </h5>
                                    <Form.Control as="textarea" rows={2} placeholder={"Passive description"} onChange={(e)=>{
                                        let warframe = addWarframePopupContent
                                        warframe.passiveDescription=e.target.value
                                        setAddWarframePopupContent(warframe)
                                    }}/>
                                </Form.Group>
                                <Form.Group controlId={"skill1"}>
                                    <Form.Control type={"text"} placeholder={"Skill 1"} onChange={(e)=>{
                                        let warframe = addWarframePopupContent
                                        warframe.abilities[0].name=e.target.value
                                        setAddWarframePopupContent(warframe)
                                    }}/>
                                </Form.Group>
                                <Form.Group controlId={"skill1Description"}>
                                    <Form.Control as="textarea" rows={2} placeholder={"Skill 1 description"} onChange={(e)=>{
                                        let warframe = addWarframePopupContent
                                        warframe.abilities[0].description=e.target.value
                                        setAddWarframePopupContent(warframe)
                                    }}/>
                                </Form.Group>
                                <Form.Group controlId={"skill2"}>
                                    <Form.Control type={"text"} placeholder={"Skill 2"} onChange={(e)=>{
                                        let warframe = addWarframePopupContent
                                        warframe.abilities[1].name=e.target.value
                                        setAddWarframePopupContent(warframe)
                                    }}/>
                                </Form.Group>
                                <Form.Group controlId={"skill2Description"}>
                                    <Form.Control as="textarea" rows={2} placeholder={"Skill 2 description"} onChange={(e)=>{
                                        let warframe = addWarframePopupContent
                                        warframe.abilities[1].description=e.target.value
                                        setAddWarframePopupContent(warframe)
                                    }}/>
                                </Form.Group>
                                <Form.Group controlId={"skill3"}>
                                    <Form.Control type={"text"} placeholder={"Skill 3"} onChange={(e)=>{
                                        let warframe = addWarframePopupContent
                                        warframe.abilities[2].name=e.target.value
                                        setAddWarframePopupContent(warframe)
                                    }}/>
                                </Form.Group>
                                <Form.Group controlId={"skill3Description"}>
                                    <Form.Control as="textarea" rows={2} placeholder={"Skill 3 description"} onChange={(e)=>{
                                        let warframe = addWarframePopupContent
                                        warframe.abilities[2].description=e.target.value
                                        setAddWarframePopupContent(warframe)
                                    }}/>
                                </Form.Group>
                                <Form.Group controlId={"skill4"}>
                                    <Form.Control type={"text"} placeholder={"Skill 4"} onChange={(e)=>{
                                        let warframe = addWarframePopupContent
                                        warframe.abilities[3].name=e.target.value
                                        setAddWarframePopupContent(warframe)
                                    }}/>
                                </Form.Group>
                                <Form.Group controlId={"skill4Description"}>
                                    <Form.Control as="textarea" rows={2} placeholder={"Skill 4 description"} onChange={(e)=>{
                                        let warframe = addWarframePopupContent
                                        warframe.abilities[3].description=e.target.value
                                        setAddWarframePopupContent(warframe)
                                    }}/>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={props.onHide}>Close</Button>
                        <Button type={"submit"} onClick={(e)=>{
                            e.preventDefault()
                            addWarframe(addWarframePopupContent)
                            setAddWarframePopup(false)
                            setWarframePopupContent({abilities: [{},{},{},{}]})
                        }}>Submit</Button>
                    </Modal.Footer>
                </Form>

            </Modal>
        );
    }

    function EditWarframeModal(props) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Form>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            <Form.Group controlId={"name"}>
                                <Form.Control defaultValue={editWarframePopupContent.name} type={"text"} placeholder={"Name"} required onChange={(e)=>{
                                    let warframe = editWarframePopupContent;
                                    warframe.name=e.target.value
                                    setEditWarframePopupContent(warframe)
                                }}/>
                            </Form.Group>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId={"description"}>
                            <Form.Control defaultValue={editWarframePopupContent.description} as="textarea" rows={3} placeholder={"Description"} onChange={(e)=>{
                                let warframe = editWarframePopupContent
                                warframe.description=e.target.value
                                setEditWarframePopupContent(warframe)
                            }}/>
                        </Form.Group>
                        <Row>
                            <Col>
                                <Form.Group controlId={"health"}>
                                    <Form.Row>
                                        <Col><h5>Health: </h5></Col>
                                        <Col><Form.Control defaultValue={editWarframePopupContent.health} type={"text"} placeholder={"Health"} required onChange={(e)=>{
                                            let warframe = editWarframePopupContent
                                            warframe.health=e.target.value
                                            setEditWarframePopupContent(warframe)
                                        }}/></Col>
                                    </Form.Row>
                                </Form.Group>
                                <Form.Group controlId={"shields"}>
                                    <Form.Row>
                                        <Col><h5>Shields: </h5></Col>
                                        <Col><Form.Control defaultValue={editWarframePopupContent.shield} type={"text"} placeholder={"Shields"} required onChange={(e)=>{
                                            let warframe = editWarframePopupContent
                                            warframe.shield=e.target.value
                                            setEditWarframePopupContent(warframe)
                                        }}/></Col>
                                    </Form.Row>
                                </Form.Group>
                                <Form.Group controlId={"armour"}>
                                    <Form.Row>
                                        <Col><h5>Armour: </h5></Col>
                                        <Col><Form.Control defaultValue={editWarframePopupContent.armor} type={"text"} placeholder={"Armour"} required onChange={(e)=>{
                                            let warframe = editWarframePopupContent
                                            warframe.armor=e.target.value
                                            setEditWarframePopupContent(warframe)
                                        }}/></Col>
                                    </Form.Row>
                                </Form.Group>
                                <Form.Group controlId={"power"}>
                                    <Form.Row>
                                        <Col><h5>Power: </h5></Col>
                                        <Col><Form.Control defaultValue={editWarframePopupContent.power} type={"text"} placeholder={"Shields"} required onChange={(e)=>{
                                            let warframe = editWarframePopupContent
                                            warframe.power=e.target.value
                                            setEditWarframePopupContent(warframe)
                                        }}/></Col>
                                    </Form.Row>
                                </Form.Group>
                                <Form.Group controlId={"sprintSpeed"}>
                                    <Form.Row>
                                        <Col><h5>Sprint speed: </h5></Col>
                                        <Col><Form.Control defaultValue={editWarframePopupContent.sprintSpeed} type={"text"} placeholder={"Sprint speed"} required onChange={(e)=>{
                                            let warframe = editWarframePopupContent
                                            warframe.sprintSpeed=e.target.value
                                            setEditWarframePopupContent(warframe)
                                        }}/></Col>
                                    </Form.Row>
                                </Form.Group>
                                <Form.Group controlId={"owned"}>
                                    <Form.Check defaultChecked={editWarframePopupContent.owned} type={"switch"} label={"Owned"} onChange={e=>{
                                        let warframe = editWarframePopupContent
                                        warframe.owned=e.target.checked
                                        setEditWarframePopupContent(warframe)
                                    }}/>
                                </Form.Group>
                                <Form.Group controlId={"mastered"}>
                                    <Form.Check defaultChecked={editWarframePopupContent.mastered} type={"switch"} label={"Mastered"} onChange={e=>{
                                        let warframe = editWarframePopupContent
                                        warframe.mastered=e.target.checked
                                        setEditWarframePopupContent(warframe)
                                    }}/>
                                </Form.Group>
                                <Form.Group controlId={"image"}>
                                    <Col><Form.Control defaultValue={editWarframePopupContent.wikiaThumbnail} type={"text"} placeholder={"Image url"} onChange={(e)=>{
                                        let warframe = editWarframePopupContent
                                        warframe.wikiaThumbnail=e.target.value
                                        setEditWarframePopupContent(warframe)
                                    }}/></Col>
                                </Form.Group>
                                <Form.Group controlId={"wikia"}>
                                    <Col><Form.Control defaultValue={editWarframePopupContent.wikiaUrl} type={"text"} placeholder={"Wiki url"} onChange={(e)=>{
                                        let warframe = editWarframePopupContent
                                        warframe.wikiaUrl=e.target.value
                                        setEditWarframePopupContent(warframe)
                                    }}/></Col>
                                </Form.Group>
                            </Col>
                            <Col>
                                <h4>Abilities:</h4>
                                <Form.Group controlId={"passive"}>
                                    <h5>Passive: </h5>
                                    <Form.Control defaultValue={editWarframePopupContent.passiveDescription} as="textarea" rows={2} placeholder={"Passive description"} onChange={(e)=>{
                                        let warframe = editWarframePopupContent
                                        warframe.passiveDescription=e.target.value
                                        setEditWarframePopupContent(warframe)
                                    }}/>
                                </Form.Group>
                                <Form.Group controlId={"skill1"}>
                                    <Form.Control defaultValue={editWarframePopupContent.abilities?editWarframePopupContent.abilities[0].name:""} type={"text"} placeholder={"Skill 1"} onChange={(e)=>{
                                        let warframe = editWarframePopupContent
                                        warframe.abilities[0].name=e.target.value
                                        setEditWarframePopupContent(warframe)
                                    }}/>
                                </Form.Group>
                                <Form.Group controlId={"skill1Description"}>
                                    <Form.Control defaultValue={editWarframePopupContent.abilities?editWarframePopupContent.abilities[0].description:""} as="textarea" rows={2} placeholder={"Skill 1 description"} onChange={(e)=>{
                                        let warframe = editWarframePopupContent
                                        warframe.abilities[0].description=e.target.value
                                        setEditWarframePopupContent(warframe)
                                    }}/>
                                </Form.Group>
                                <Form.Group controlId={"skill2"}>
                                    <Form.Control defaultValue={editWarframePopupContent.abilities?editWarframePopupContent.abilities[1].name:""} type={"text"} placeholder={"Skill 2"} onChange={(e)=>{
                                        let warframe = editWarframePopupContent
                                        warframe.abilities[1].name=e.target.value
                                        setEditWarframePopupContent(warframe)
                                    }}/>
                                </Form.Group>
                                <Form.Group controlId={"skill2Description"}>
                                    <Form.Control defaultValue={editWarframePopupContent.abilities?editWarframePopupContent.abilities[1].description:""} as="textarea" rows={2} placeholder={"Skill 2 description"} onChange={(e)=>{
                                        let warframe = editWarframePopupContent
                                        warframe.abilities[1].description=e.target.value
                                        setEditWarframePopupContent(warframe)
                                    }}/>
                                </Form.Group>
                                <Form.Group controlId={"skill3"}>
                                    <Form.Control defaultValue={editWarframePopupContent.abilities?editWarframePopupContent.abilities[2].name:""} type={"text"} placeholder={"Skill 3"} onChange={(e)=>{
                                        let warframe = editWarframePopupContent
                                        warframe.abilities[2].name=e.target.value
                                        setEditWarframePopupContent(warframe)
                                    }}/>
                                </Form.Group>
                                <Form.Group controlId={"skill3Description"}>
                                    <Form.Control defaultValue={editWarframePopupContent.abilities?editWarframePopupContent.abilities[2].description:""} as="textarea" rows={2} placeholder={"Skill 3 description"} onChange={(e)=>{
                                        let warframe = editWarframePopupContent
                                        warframe.abilities[2].description=e.target.value
                                        setEditWarframePopupContent(warframe)
                                    }}/>
                                </Form.Group>
                                <Form.Group controlId={"skill4"}>
                                    <Form.Control defaultValue={editWarframePopupContent.abilities?editWarframePopupContent.abilities[3].name:""} type={"text"} placeholder={"Skill 4"} onChange={(e)=>{
                                        let warframe = editWarframePopupContent
                                        warframe.abilities[3].name=e.target.value
                                        setEditWarframePopupContent(warframe)
                                    }}/>
                                </Form.Group>
                                <Form.Group controlId={"skill4Description"}>
                                    <Form.Control defaultValue={editWarframePopupContent.abilities?editWarframePopupContent.abilities[3].description:""} as="textarea" rows={2} placeholder={"Skill 4 description"} onChange={(e)=>{
                                        let warframe = editWarframePopupContent
                                        warframe.abilities[3].description=e.target.value
                                        setEditWarframePopupContent(warframe)
                                    }}/>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={props.onHide}>Close</Button>
                        <Button type={"submit"} onClick={(e)=>{
                            e.preventDefault()
                            editWarframe(editWarframePopupContent)
                            setEditWarframePopup(false)
                            setEditWarframePopupContent({})
                        }}>Save</Button>
                    </Modal.Footer>
                </Form>

            </Modal>
        );
    }

    function WeaponModal(props) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {props.content.name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>{props.content.description}</h4>
                    <Row>
                        <Col>
                            <p><h5>Category: </h5>{props.content.type}</p>
                            <p><h5>Critical chance: </h5>{props.content.criticalChance}</p>
                            <p><h5>Critical multiplier: </h5>{props.content.criticalMultiplier}</p>
                            <p><h5>Status chance: </h5>{props.content.procChance}</p>
                            <p><h5>Fire rate: </h5>{props.content.fireRate}</p>
                            <p><h5>Accuracy: </h5>{props.content.accuracy}</p>
                            <p><h5>Noise: </h5>{props.content.noise}</p>
                            <p><h5>Trigger: </h5>{props.content.trigger}</p>
                        </Col>
                        <Col>
                            <p><h5>Magazine size: </h5>{props.content.magazineSize}</p>
                            <p><h5>Ammo: </h5>{props.content.ammo}</p>
                            <p><h5>Reload time: </h5>{props.content.reloadTime}</p>
                            <p><h5>Multishot: </h5>{props.content.multishot}</p>
                            <p><h5>Damage: </h5>{props.content.damage}</p>
                            <p><h5>Mastered: </h5>{String(props.content.mastered)}</p>
                            <p><h5>Owned: </h5>{String(props.content.owned)}</p>
                            <Image src={props.content.wikiaThumbnail!==undefined?props.content.wikiaThumbnail.slice(0,-34):""}/>
                        </Col>
                    </Row>

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={()=>{
                        setWeaponPopup(false)
                        setWeaponPopupContent({})
                        deleteWeapon(props.content.name)
                    }}>Delete</Button>
                    <Button onClick={()=>{setEditWeaponPopup(true);setEditWeaponPopupContent(weaponPopupContent)}}>Edit</Button>
                    <Button href={props.content.wikiaUrl!==undefined?props.content.wikiaUrl:""} disabled={props.content.wikiaUrl===undefined}>Wiki page</Button>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    function AddWeaponModal(props) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <Form.Group controlId={"name"}>
                            <Form.Control type={"text"} placeholder={"Name"} required onChange={e=>{
                                let weapon = addWarframePopupContent
                                weapon.name = e.target.value
                                setAddWeaponPopupContent(weapon)
                            }}/>
                        </Form.Group>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId={"description"}>
                        <Form.Control as="textarea" rows={3} placeholder={"description"} onChange={e=>{
                            let weapon = addWarframePopupContent
                            weapon.description = e.target.value
                            setAddWarframePopupContent(weapon)
                        }}/>
                    </Form.Group>
                    <Row>
                        <Col>
                            <Form.Group controlId={"category"}>
                                <Form.Row>
                                    <Col><h5>Category: </h5></Col>
                                    <Col><Form.Control type={"text"} placeholder={"Category"} required onChange={(e)=>{
                                        let weapon = addWarframePopupContent
                                        weapon.type=e.target.value
                                        setAddWarframePopupContent(weapon)
                                    }}/></Col>
                                </Form.Row>
                            </Form.Group>
                            <Form.Group controlId={"criticalChance"}>
                                <Form.Row>
                                    <Col><h5>Critical chance: </h5></Col>
                                    <Col><Form.Control type={"text"} placeholder={"Critical chance"} required onChange={(e)=>{
                                        let weapon = addWarframePopupContent
                                        weapon.criticalChance=e.target.value
                                        setAddWarframePopupContent(weapon)
                                    }}/></Col>
                                </Form.Row>
                            </Form.Group>
                            <Form.Group controlId={"criticalMultiplier"}>
                                <Form.Row>
                                    <Col><h5>Critical multiplier: </h5></Col>
                                    <Col><Form.Control type={"text"} placeholder={"Critical multiplier"} required onChange={(e)=>{
                                        let weapon = addWarframePopupContent
                                        weapon.criticalMultiplier=e.target.value
                                        setAddWarframePopupContent(weapon)
                                    }}/></Col>
                                </Form.Row>
                            </Form.Group>
                            <Form.Group controlId={"procChance"}>
                                <Form.Row>
                                    <Col><h5>Status chance: </h5></Col>
                                    <Col><Form.Control type={"text"} placeholder={"Status chance"} required onChange={(e)=>{
                                        let weapon = addWarframePopupContent
                                        weapon.procChance=e.target.value
                                        setAddWarframePopupContent(weapon)
                                    }}/></Col>
                                </Form.Row>
                            </Form.Group>
                            <Form.Group controlId={"fireRate"}>
                                <Form.Row>
                                    <Col><h5>Fire rate: </h5></Col>
                                    <Col><Form.Control type={"text"} placeholder={"Fire rate"} required onChange={(e)=>{
                                        let weapon = addWarframePopupContent
                                        weapon.fireRate=e.target.value
                                        setAddWarframePopupContent(weapon)
                                    }}/></Col>
                                </Form.Row>
                            </Form.Group>
                            <Form.Group controlId={"accuracy"}>
                                <Form.Row>
                                    <Col><h5>Accuracy: </h5></Col>
                                    <Col><Form.Control type={"text"} placeholder={"Accuracy"} required onChange={(e)=>{
                                        let weapon = addWarframePopupContent
                                        weapon.accuracy=e.target.value
                                        setAddWarframePopupContent(weapon)
                                    }}/></Col>
                                </Form.Row>
                            </Form.Group>
                            <Form.Group controlId={"noise"}>
                                <Form.Row>
                                    <Col><h5>Noise: </h5></Col>
                                    <Col><Form.Control type={"text"} placeholder={"Noise"} required onChange={(e)=>{
                                        let weapon = addWarframePopupContent
                                        weapon.noise=e.target.value
                                        setAddWarframePopupContent(weapon)
                                    }}/></Col>
                                </Form.Row>
                            </Form.Group>
                            <Form.Group controlId={"trigger"}>
                                <Form.Row>
                                    <Col><h5>Trigger: </h5></Col>
                                    <Col><Form.Control type={"text"} placeholder={"Trigger"} onChange={(e)=>{
                                        let weapon = addWarframePopupContent
                                        weapon.trigger=e.target.value
                                        setAddWarframePopupContent(weapon)
                                    }}/></Col>
                                </Form.Row>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId={"magazineSize"}>
                                <Form.Row>
                                    <Col><h5>Magazine size: </h5></Col>
                                    <Col><Form.Control type={"text"} placeholder={"Magazine size"} onChange={(e)=>{
                                        let weapon = addWarframePopupContent
                                        weapon.magazineSize=e.target.value
                                        setAddWarframePopupContent(weapon)
                                    }}/></Col>
                                </Form.Row>
                            </Form.Group>
                            <Form.Group controlId={"ammo"}>
                                <Form.Row>
                                    <Col><h5>Ammo: </h5></Col>
                                    <Col><Form.Control type={"text"} placeholder={"Ammo"} onChange={(e)=>{
                                        let weapon = addWarframePopupContent
                                        weapon.ammo=e.target.value
                                        setAddWarframePopupContent(weapon)
                                    }}/></Col>
                                </Form.Row>
                            </Form.Group>
                            <Form.Group controlId={"reloadTime"}>
                                <Form.Row>
                                    <Col><h5>Reload time: </h5></Col>
                                    <Col><Form.Control type={"text"} placeholder={"Reload time"} onChange={(e)=>{
                                        let weapon = addWarframePopupContent
                                        weapon.reloadTime=e.target.value
                                        setAddWarframePopupContent(weapon)
                                    }}/></Col>
                                </Form.Row>
                            </Form.Group>
                            <Form.Group controlId={"multishot"}>
                                <Form.Row>
                                    <Col><h5>Multishot: </h5></Col>
                                    <Col><Form.Control type={"text"} placeholder={"Multishot"} onChange={(e)=>{
                                        let weapon = addWarframePopupContent
                                        weapon.multishot=e.target.value
                                        setAddWarframePopupContent(weapon)
                                    }}/></Col>
                                </Form.Row>
                            </Form.Group>
                            <Form.Group controlId={"damage"}>
                                <Form.Row>
                                    <Col><h5>Damage: </h5></Col>
                                    <Col><Form.Control type={"text"} placeholder={"Damage"} required onChange={(e)=>{
                                        let weapon = addWarframePopupContent
                                        weapon.damage=e.target.value
                                        setAddWarframePopupContent(weapon)
                                    }}/></Col>
                                </Form.Row>
                            </Form.Group>
                            <Form.Group controlId={"owned"}>
                                <Form.Check type={"switch"} label={"Owned"} onChange={e=>{
                                    let weapon = addWarframePopupContent
                                    weapon.owned=e.target.checked
                                    setAddWarframePopupContent(weapon)
                                }}/>
                            </Form.Group>
                            <Form.Group controlId={"mastered"}>
                                <Form.Check type={"switch"} label={"Mastered"} onChange={e=>{
                                    let weapon = addWarframePopupContent
                                    weapon.mastered=e.target.checked
                                    setAddWarframePopupContent(weapon)
                                }}/>
                            </Form.Group>
                            <Form.Group controlId={"image"}>
                                    <Form.Control type={"text"} placeholder={"Image"} onChange={(e)=>{
                                        let weapon = addWarframePopupContent
                                        weapon.wikiaThumbnail=e.target.value
                                        setAddWarframePopupContent(weapon)
                                    }}/>
                            </Form.Group>
                            <Form.Group controlId={"wikia"}>
                                <Form.Control type={"text"} placeholder={"Wiki"} onChange={(e)=>{
                                    let weapon = addWarframePopupContent
                                    weapon.wikiaUrl=e.target.value
                                    setAddWarframePopupContent(weapon)
                                }}/>
                            </Form.Group>
                        </Col>
                    </Row>

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                    <Button type={"submit"} onClick={(e)=>{
                        e.preventDefault()
                        addWeapon(addWeaponPopupContent)
                        setAddWeaponPopup(false)
                        setWeaponPopupContent({})
                    }}>Submit</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    function EditWeaponModal(props) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <Form.Group controlId={"name"}>
                            <Form.Control defaultValue={editWeaponPopupContent.name} type={"text"} placeholder={"Name"} required onChange={e=>{
                                let weapon = editWeaponPopupContent
                                weapon.name = e.target.value
                                setEditWeaponPopupContent(weapon)
                            }}/>
                        </Form.Group>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId={"description"}>
                        <Form.Control defaultValue={editWeaponPopupContent.description} as="textarea" rows={3} placeholder={"description"} onChange={e=>{
                            let weapon = editWeaponPopupContent
                            weapon.description = e.target.value
                            setEditWeaponPopupContent(weapon)
                        }}/>
                    </Form.Group>
                    <Row>
                        <Col>
                            <Form.Group controlId={"category"}>
                                <Form.Row>
                                    <Col><h5>Category: </h5></Col>
                                    <Col><Form.Control defaultValue={editWeaponPopupContent.type} type={"text"} placeholder={"Category"} required onChange={(e)=>{
                                        let weapon = editWeaponPopupContent
                                        weapon.type=e.target.value
                                        setEditWeaponPopupContent(weapon)
                                    }}/></Col>
                                </Form.Row>
                            </Form.Group>
                            <Form.Group controlId={"criticalChance"}>
                                <Form.Row>
                                    <Col><h5>Critical chance: </h5></Col>
                                    <Col><Form.Control defaultValue={editWeaponPopupContent.criticalChance} type={"text"} placeholder={"Critical chance"} required onChange={(e)=>{
                                        let weapon = editWeaponPopupContent
                                        weapon.criticalChance=e.target.value
                                        setEditWeaponPopupContent(weapon)
                                    }}/></Col>
                                </Form.Row>
                            </Form.Group>
                            <Form.Group controlId={"criticalMultiplier"}>
                                <Form.Row>
                                    <Col><h5>Critical multiplier: </h5></Col>
                                    <Col><Form.Control defaultValue={editWeaponPopupContent.criticalMultiplier} type={"text"} placeholder={"Critical multiplier"} required onChange={(e)=>{
                                        let weapon = editWeaponPopupContent
                                        weapon.criticalMultiplier=e.target.value
                                        setEditWeaponPopupContent(weapon)
                                    }}/></Col>
                                </Form.Row>
                            </Form.Group>
                            <Form.Group controlId={"procChance"}>
                                <Form.Row>
                                    <Col><h5>Status chance: </h5></Col>
                                    <Col><Form.Control defaultValue={editWeaponPopupContent.procChance} type={"text"} placeholder={"Status chance"} required onChange={(e)=>{
                                        let weapon = editWeaponPopupContent
                                        weapon.procChance=e.target.value
                                        setEditWeaponPopupContent(weapon)
                                    }}/></Col>
                                </Form.Row>
                            </Form.Group>
                            <Form.Group controlId={"fireRate"}>
                                <Form.Row>
                                    <Col><h5>Fire rate: </h5></Col>
                                    <Col><Form.Control defaultValue={editWeaponPopupContent.fireRate} type={"text"} placeholder={"Fire rate"} required onChange={(e)=>{
                                        let weapon = editWeaponPopupContent
                                        weapon.fireRate=e.target.value
                                        setEditWeaponPopupContent(weapon)
                                    }}/></Col>
                                </Form.Row>
                            </Form.Group>
                            <Form.Group controlId={"accuracy"}>
                                <Form.Row>
                                    <Col><h5>Accuracy: </h5></Col>
                                    <Col><Form.Control defaultValue={editWeaponPopupContent.accuracy} type={"text"} placeholder={"Accuracy"} required onChange={(e)=>{
                                        let weapon = editWeaponPopupContent
                                        weapon.accuracy=e.target.value
                                        setEditWeaponPopupContent(weapon)
                                    }}/></Col>
                                </Form.Row>
                            </Form.Group>
                            <Form.Group controlId={"noise"}>
                                <Form.Row>
                                    <Col><h5>Noise: </h5></Col>
                                    <Col><Form.Control defaultValue={editWeaponPopupContent.noise} type={"text"} placeholder={"Noise"} required onChange={(e)=>{
                                        let weapon = editWeaponPopupContent
                                        weapon.noise=e.target.value
                                        setEditWeaponPopupContent(weapon)
                                    }}/></Col>
                                </Form.Row>
                            </Form.Group>
                            <Form.Group controlId={"trigger"}>
                                <Form.Row>
                                    <Col><h5>Trigger: </h5></Col>
                                    <Col><Form.Control defaultValue={editWeaponPopupContent.trigger} type={"text"} placeholder={"Trigger"} onChange={(e)=>{
                                        let weapon = editWeaponPopupContent
                                        weapon.trigger=e.target.value
                                        setEditWeaponPopupContent(weapon)
                                    }}/></Col>
                                </Form.Row>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId={"magazineSize"}>
                                <Form.Row>
                                    <Col><h5>Magazine size: </h5></Col>
                                    <Col><Form.Control defaultValue={editWeaponPopupContent.magazineSize} type={"text"} placeholder={"Magazine size"} onChange={(e)=>{
                                        let weapon = editWeaponPopupContent
                                        weapon.magazineSize=e.target.value
                                        setEditWeaponPopupContent(weapon)
                                    }}/></Col>
                                </Form.Row>
                            </Form.Group>
                            <Form.Group controlId={"ammo"}>
                                <Form.Row>
                                    <Col><h5>Ammo: </h5></Col>
                                    <Col><Form.Control defaultValue={editWeaponPopupContent.ammo} type={"text"} placeholder={"Ammo"} onChange={(e)=>{
                                        let weapon = editWeaponPopupContent
                                        weapon.ammo=e.target.value
                                        setEditWeaponPopupContent(weapon)
                                    }}/></Col>
                                </Form.Row>
                            </Form.Group>
                            <Form.Group controlId={"reloadTime"}>
                                <Form.Row>
                                    <Col><h5>Reload time: </h5></Col>
                                    <Col><Form.Control defaultValue={editWeaponPopupContent.reloadTime} type={"text"} placeholder={"Reload time"} onChange={(e)=>{
                                        let weapon = editWeaponPopupContent
                                        weapon.reloadTime=e.target.value
                                        setEditWeaponPopupContent(weapon)
                                    }}/></Col>
                                </Form.Row>
                            </Form.Group>
                            <Form.Group controlId={"multishot"}>
                                <Form.Row>
                                    <Col><h5>Multishot: </h5></Col>
                                    <Col><Form.Control defaultValue={editWeaponPopupContent.multishot} type={"text"} placeholder={"Multishot"} onChange={(e)=>{
                                        let weapon = editWeaponPopupContent
                                        weapon.multishot=e.target.value
                                        setEditWeaponPopupContent(weapon)
                                    }}/></Col>
                                </Form.Row>
                            </Form.Group>
                            <Form.Group controlId={"damage"}>
                                <Form.Row>
                                    <Col><h5>Damage: </h5></Col>
                                    <Col><Form.Control defaultValue={editWeaponPopupContent.damage} type={"text"} placeholder={"Damage"} required onChange={(e)=>{
                                        let weapon = editWeaponPopupContent
                                        weapon.damage=e.target.value
                                        setEditWeaponPopupContent(weapon)
                                    }}/></Col>
                                </Form.Row>
                            </Form.Group>
                            <Form.Group controlId={"owned"}>
                                <Form.Check defaultChecked={editWeaponPopupContent.owned} type={"switch"} label={"Owned"} onChange={e=>{
                                    let weapon = editWeaponPopupContent
                                    weapon.owned=e.target.checked
                                    setEditWeaponPopupContent(weapon)
                                }}/>
                            </Form.Group>
                            <Form.Group controlId={"mastered"}>
                                <Form.Check defaultChecked={editWeaponPopupContent.mastered} type={"switch"} label={"Mastered"} onChange={e=>{
                                    let weapon = editWeaponPopupContent
                                    weapon.mastered=e.target.checked
                                    setEditWeaponPopupContent(weapon)
                                }}/>
                            </Form.Group>
                            <Form.Group controlId={"image"}>
                                <Form.Control defaultValue={editWeaponPopupContent.wikiaThumbnail} type={"text"} placeholder={"Image"} onChange={(e)=>{
                                    let weapon = editWeaponPopupContent
                                    weapon.wikiaThumbnail=e.target.value
                                    setEditWeaponPopupContent(weapon)
                                }}/>
                            </Form.Group>
                            <Form.Group controlId={"wikia"}>
                                <Form.Control defaultValue={editWeaponPopupContent.wikiaUrl} type={"text"} placeholder={"Wiki"} onChange={(e)=>{
                                    let weapon = editWeaponPopupContent
                                    weapon.wikiaUrl=e.target.value
                                    setEditWeaponPopupContent(weapon)
                                }}/>
                            </Form.Group>
                        </Col>
                    </Row>

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                    <Button type={"submit"} onClick={(e)=>{
                        e.preventDefault()
                        editWeapon(editWeaponPopupContent)
                        setEditWeaponPopup(false)
                        setEditWeaponPopupContent({})
                    }}>Save</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    return <div>
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Warframe Mastery</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link to={"/"}><Link to={"/"}>Home</Link></Nav.Link>
                    <Nav.Link to={"/about"}><Link to={"/about"}>About</Link></Nav.Link>
                    <NavDropdown title="Add" id="basic-nav-dropdown">
                        <NavDropdown.Item onClick={()=>setAddWarframePopup(true)}>Warframe</NavDropdown.Item>
                        <NavDropdown.Item onClick={()=>setAddWeaponPopup(true)} >Weapon</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>

        <Container fluid>
            <Row>
                <Col>
                    <Button variant="primary" size="lg" block onClick={()=>setCategory("warframes")}>
                        Warframes
                    </Button>
                </Col>
                <Col>
                    <Button variant="primary" size="lg" block onClick={()=>setCategory("weapons")}>
                        Weapons
                    </Button>
                </Col>
            </Row>
        </Container>

        {category==="warframes"?
            <Container fluid>
                <Row style={{justifyContent: "center"}}>
                    {warframes.map(warframe=> {
                        let link = String(warframe.wikiaThumbnail)
                        return <Card style={{ width: '10rem',height: '10rem', margin: "1rem" }}>
                            <Card.Img  style={{
                                position: 'absolute',
                                height:'100%',
                                marginLeft: 'auto',
                                marginRight:'auto',
                                display:'block',
                                objectPosition: '50% 0',
                                objectFit: 'cover'
                            }} fluid variant="top" src={link.slice(0,-34)} />
                            <Card.Body>
                                <Button style={{position: 'absolute', bottom: '5%', left: '5%'}} variant="primary" onClick={()=>{
                                    setWarframePopup(true)
                                    setWarframePopupContent(warframe)
                                }}>{warframe.name}</Button>
                            </Card.Body>
                        </Card>
                    })}
                </Row>
            </Container>:
            <Container fluid>
                <Row style={{justifyContent: "center"}}>
                    {weapons.map(weapon=> {
                        let link = String(weapon.wikiaThumbnail)
                        return <Card style={{ width: '10rem', height: '10rem', margin: '1rem'}}>
                            <Card.Img style={{
                                position: 'absolute',
                                height:'100%',
                                marginLeft: 'auto',
                                marginRight:'auto',
                                display:'block',
                                objectPosition: '50% 0',
                                objectFit: 'cover'
                            }} variant="top" src={link.slice(0,-34)} />
                            <Card.Body>
                                <Button style={{position: 'absolute', bottom: '5%', left: '5%'}} variant="primary" onClick={()=>{
                                    setWeaponPopup(true)
                                    setWeaponPopupContent(weapon)
                                }}>{weapon.name}</Button>
                            </Card.Body>
                        </Card>
                    })}
                </Row>

            </Container>}
            <WarframeModal show={warframePopup} content={warframePopupContent} onHide={() => setWarframePopup(false)}/>
            <AddWarframeModal show={addWarframePopup} onHide={() => setAddWarframePopup(false)}/>
            <EditWarframeModal show={editWarframePopup} content={warframePopupContent} onHide={()=> setEditWarframePopup(false)} />
            <WeaponModal show={weaponPopup} content={weaponPopupContent} onHide={() => setWeaponPopup(false)}/>
            <AddWeaponModal show={addWeaponPopup} onHide={() => setAddWeaponPopup(false)}/>
            <EditWeaponModal show={editWeaponPopup} content={weaponPopupContent} onHide={()=> setEditWeaponPopup(false)} />
        </div>
}

const mapStateToProps = (state) => {
    return {
        weapons: WeaponsSelectors.getWeapons(state),
        warframes: WarframeSelectors.getWarframes(state)
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        addWarframe: (warframe)=>{dispatch(warframeActions.addWarframe(warframe))},
        deleteWarframe: (name)=>{dispatch(warframeActions.deleteWarframe(name))},
        editWarframe: (warframe)=>{dispatch(warframeActions.editWarframe(warframe))},
        addWeapon: (weapon)=>{dispatch(weaponActions.addWeapon(weapon))},
        deleteWeapon: (name)=>{dispatch(weaponActions.deleteWeapon(name))},
        editWeapon: (weapon)=>{dispatch(weaponActions.editWeapon(weapon))}
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Homepage)