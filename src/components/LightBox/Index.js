import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Modal, Carousel, Icon } from 'antd';

import styles from './Index.less';
const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props
    return (
        <div
            className={className}
            style={{ ...style, display: 'block', width: 25, height: 25, fontSize: 25 }}
            onClick={onClick}
        >
            <Icon type="left" style={{ color: 'rgba(0, 0, 0, 0.45)' }} />
        </div>
    );
}
const SampleNextArrow = (props) => {
    const { className, style, onClick } = props
    return (
        <div
            className={className}
            style={{ ...style, display: 'block', width: 25, height: 25, fontSize: 25 }}
            onClick={onClick}
        >
            <Icon type="right" style={{ color: 'rgba(0, 0, 0, 0.45)' }} />
        </div>
    );
}
// const 
export default class Index extends PureComponent {
    static propTypes = {
        images: PropTypes.arrayOf(PropTypes.shape({
            src: PropTypes.string.isRequired,
        })).isRequired
    }
    static defaultProps = {
        images: [{ src: 'https://images.unsplash.com/photo-1471127432458-65206be149c9?dpr=2&auto=format&crop=faces&fit=crop&w=240&h=159' },
        { src: 'https://images.unsplash.com/photo-1453550486481-aa4175b013ea?dpr=2&auto=format&crop=faces&fit=crop&w=240&h=159' },
        { src: 'https://images.unsplash.com/photo-1471127432458-65206be149c9?dpr=2&auto=format&crop=faces&fit=crop&w=240&h=159' },
        { src: 'https://images.unsplash.com/photo-1471127432458-65206be149c9?dpr=2&auto=format&crop=faces&fit=crop&w=240&h=159' },
        { src: 'https://images.unsplash.com/photo-1471127432458-65206be149c9?dpr=2&auto=format&crop=faces&fit=crop&w=240&h=159' },
        { src: 'https://images.unsplash.com/photo-1471127432458-65206be149c9?dpr=2&auto=format&crop=faces&fit=crop&w=240&h=159' },
        { src: 'https://images.unsplash.com/photo-1471127432458-65206be149c9?dpr=2&auto=format&crop=faces&fit=crop&w=240&h=159' },
        { src: 'https://images.unsplash.com/photo-1471127432458-65206be149c9?dpr=2&auto=format&crop=faces&fit=crop&w=240&h=159' },
        { src: 'https://images.unsplash.com/photo-1471127432458-65206be149c9?dpr=2&auto=format&crop=faces&fit=crop&w=240&h=159' }
        ]
    }
    state = {
        modalVisible: false,
        currentIndex: 0
    }

    showModal = (index) => {
        this.setState({
            modalVisible: true,
            currentIndex: index
        });
    }
    hideModal = (currentIndex) => {
        this.setState({
            modalVisible: false,
        });
    }
    render() {
        const { images } = this.props;
        const { modalVisible, currentIndex } = this.state;
        const carouselProps = {
            arrows: true,
            adaptiveHeight: true,
            initialSlide: currentIndex,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />
        };
        return (
            <div className={styles.lightBoxWrap}>
                <Row gutter={2}>
                    {
                        images.map((image, i) => {
                            return (
                                <Col key={`img_${i}`}  xs={12} sm={8}  md={6} xl={3} style={{ marginBottom: 16 }} >
                                    <a className={styles.imgWrap} onClick={() => { this.showModal(i) }}>
                                        <img src={image.src} />
                                    </a>
                                </Col>
                            )
                        })
                    }
                </Row>
                <Modal
                    title={null}
                    // width={700}
                    visible={modalVisible}
                    footer={null}
                    destroyOnClose={true}
                    onCancel={() => this.hideModal()}
                >
                    <div style={{ padding: '16px 0 0' }}>
                        <Carousel {...carouselProps}>
                            {
                                images.map((img, i) =>
                                    <div key={i}>
                                        <div className="image-modal-container">
                                            <img src={img.src} />
                                        </div>
                                    </div>
                                )
                            }
                        </Carousel>
                    </div>
                </Modal>
            </div>
        );
    }
}
