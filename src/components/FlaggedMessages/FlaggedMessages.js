import React from 'react';

import './FlaggedMessages.scss';

export const FlaggedMessages = (props) => {
    const { flagged, setFlagged } = props;

    const setActiveMessage = (item) => {
        const message = item.message;
        let flaggedClone = [...flagged];
        const found = flaggedClone.find(flaggedMessage => flaggedMessage.message.id === message.id);
        const active = flaggedClone.find(flaggedMessage => flaggedMessage.active);
        if (found && !found.active) {
            if (active) {
                const activeIndex = flaggedClone.findIndex(item => item.active);
                flaggedClone[activeIndex].active = false;
            }
            const index = flaggedClone.findIndex(item => item === found);
            flaggedClone[index].active = true;
            setFlagged(flaggedClone);
        } else if (found && found.active) {
            const index = flaggedClone.findIndex(item => item === found);
            flaggedClone[index].active = false;
            setFlagged(flaggedClone);
        }
    }

    const selectMessage = (item) => {
        const message = item.message;
        let flaggedClone = [...flagged];
        const found = flaggedClone.find(flaggedMessage => flaggedMessage.message.id === message.id);
        const index = flaggedClone.findIndex(item => item === found);

        if (found.selected) {
            flaggedClone[index].selected = false;
        } else {
            flaggedClone[index].selected = true;
        }
        setFlagged(flaggedClone);
    }

    return (
        <section className="container flagged-messages-container">
            <ul>
                {
                    flagged && flagged.map((item, i) => <li key={i} >
                        <div onClick={() => selectMessage(item)} className={item.selected ? 'selected message-select' : 'message-select'}></div>
                        <div onClick={() => setActiveMessage(item)} className={item.active ? 'active message-container' : 'message-container'}>
                            <div className="message-details-container">
                                <p>User: {item.message.user.id}</p>
                            </div>
                            <div className="message-contents-container">
                                <p>{item.message.text}</p>
                            </div>
                        </div>
                    </li>
                    )
                }
            </ul>
        </section>
    )
}