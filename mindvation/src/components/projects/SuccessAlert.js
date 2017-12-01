import React, {Component} from 'react';
import {Button, Modal} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';
import history from '../../util/history';

class SuccessAlert extends Component {
    state = {
        modalOpen: false,
        id: ''
    };

    openModal = (id) => {
        this.setState({
            modalOpen: true,
            id: id
        })
    };

    closeModal = () => this.setState({modalOpen: false});

    goToDetail = (id) => {
        this.closeModal();
        switch (id.substr(0, 1)) {
            case "P":
                history.push(`/home/projects/${id}`);
                break;
            case "R":
                history.push(`/home/requirement/${id}`);
                break;
            case "S":
                history.push(`/home/story/${id}`);
                break;
        }
    };

    render() {
        const {modalOpen, id} = this.state;
        return (
            <Modal
                closeOnEscape={false}
                closeOnRootNodeClick={false}
                open={modalOpen}
                size="small">
                <div className="alert-content">
                    <span className="id-text">{id}</span>
                    <FormattedMessage
                        id='successfullyCreated'
                        defaultMessage='successfully created'
                    />
                </div>
                <Modal.Actions>
                    <Button className="cancel-button" onClick={() => this.closeModal()}>
                        <FormattedMessage
                            id='close'
                            defaultMessage='Close'
                        />
                    </Button>
                    <Button className="confirm-button" onClick={() => this.goToDetail(id)}>
                        <FormattedMessage
                            id='goToDetail'
                            defaultMessage='Go To Detail'
                        />
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default SuccessAlert;