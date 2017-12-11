import React, {Component} from 'react';
import {Modal, Button, Grid} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';
import {getTaskHistory} from '../../../util/Service';
import {dateFormat} from '../../../util/CommUtil';

class TaskHistory extends Component {

    state = {modalOpen: false, taskHistory: []};

    openModal = (task) => {
        this.setState({modalOpen: true, taskHistory: []});
        getTaskHistory(task.idNumber, (res) => {
            this.formatHistory(res);
        })
    };

    formatHistory = (history) => {
        console.info(history);
        if (history && history.length > 0) {
            let tempHistory = [];
            history.map((item, i) => {
                if (i === 0 || dateFormat(new Date(item.updateTime), "yyyy-MM-dd") !== this.lastHistoryDate) {
                    this.lastHistoryDate = dateFormat(new Date(item.updateTime), "yyyy-MM-dd");
                    tempHistory.push({
                        date: dateFormat(new Date(item.updateTime), "yyyy-MM-dd"),
                        historyItem: [item]
                    });
                } else {
                    tempHistory[tempHistory.length - 1].historyItem.push(item);
                }
            });
            this.setState({
                taskHistory: tempHistory
            })
        }
    };

    closeModal = () => this.setState({modalOpen: false});


    render() {
        const {modalOpen, taskHistory} = this.state;
        return (
            <Modal
                closeOnEscape={false}
                closeOnRootNodeClick={false}
                open={modalOpen}
                size="large"
            >
                <Modal.Header className="modal-title-border">
                    <FormattedMessage
                        id='taskHistory'
                        defaultMessage='Task History'
                    />
                </Modal.Header>
                <Modal.Content>
                    {
                        taskHistory.length > 0 ?
                            taskHistory.map((item, i) => {
                                return <div className="task-history-item" key={i}>
                                    <div className="task-history-date">{item.date}</div>
                                    <div className="task-history-detail">
                                        <Grid>
                                            {
                                                item.historyItem.map((history, j) => {
                                                    return <Grid.Row columns={3} key={j}>
                                                        <Grid.Column width={2} className="task-history-time">
                                                            {dateFormat(new Date(history.updateTime), "hh:mm:ss")}
                                                        </Grid.Column>
                                                        <Grid.Column width={3}>
                                                            <FormattedMessage
                                                                id={history.action + 'TaskHistory'}
                                                            />
                                                        </Grid.Column>
                                                        {history.action === "create" ? null :
                                                            history.action === "update" ?
                                                                <Grid.Column width={11}>
                                                                    <div>
                                                                        <FormattedMessage
                                                                            id="updateTaskProgress"
                                                                            defaultValue="Updated progress to"
                                                                        />
                                                                        <span className="task-progress-text">{history.nowProgress + '%'}</span>
                                                                    </div>
                                                                    <div
                                                                        className="task-history-remark">{history.nowRemarks}</div>
                                                                </Grid.Column> : <Grid.Column width={10}>
                                                                    {history.action === "upload" ?
                                                                        <a href={history.addAttchInfo.url}
                                                                           target="_blank" rel="noopener noreferrer">
                                                                            {history.addAttchInfo.originName}
                                                                        </a> : <a href={history.deleteAttchInfo.url}
                                                                                  target="_blank" rel="noopener noreferrer">
                                                                            {history.deleteAttchInfo.originName}
                                                                        </a>}
                                                                </Grid.Column>}
                                                    </Grid.Row>
                                                })
                                            }
                                        </Grid>
                                    </div>
                                </div>
                            }) : null
                    }
                </Modal.Content>
                <Modal.Actions>
                    <Button className="cancel-button" onClick={() => this.closeModal()}>
                        <FormattedMessage
                            id='close'
                            defaultMessage='Close'
                        />
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default TaskHistory;
