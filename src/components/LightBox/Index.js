import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Modal, Carousel, Icon } from 'antd';

import CustomCarouser from './Carouser';

import styles from './Index.less';

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
    return (
      <div className={styles.lightBoxWrap}>
        <Row gutter={2}>
          {
            images.map((image, i) => {
              return (
                <Col key={`img_${i}`} xs={12} sm={8} md={6} xl={3} style={{ marginBottom: 16 }} >
                  <div className={styles.imgWrap} onClick={() => { this.showModal(i) }}>
                    <div className={styles.imgBox}>
                      <img src={image.src} />
                      <span className={styles.listItemAction}>
                        <Icon type="eye-o" style={{ color: "rgba(255, 255, 255, 0.85)", fontSize: 16 }} />
                      </span>
                    </div>

                  </div>
                </Col>
              )
            })
          }
        </Row>
        {
          images.length > 0 ? (
            <CustomCarouser
              visible={modalVisible}
              images={images}
              currentIndex={currentIndex}
              hideCarouser={this.hideModal}

            />
          ) : null
        }
      </div>
    );
  }
}
