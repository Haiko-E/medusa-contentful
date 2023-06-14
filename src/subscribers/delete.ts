class DeleteSubscriber {
  constructor({ eventBusService }) {
    eventBusService.subscribe('product.updated', this.handleOrder);
  }

  handleOrder = async (data) => {
    console.log('from subscriber');
    console.log('Product updated: ' + data);
  };
}

export default DeleteSubscriber;
