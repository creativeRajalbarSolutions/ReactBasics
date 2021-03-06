import React from 'react';
import {Observable} from 'rxjs/Rx';
import ProductSummary from './ProductSummary.jsx';
import {ProductData} from '../../MockData';

export default class Products extends React.Component {
    constructor(props){
        super(props);

        this.handleShowAllClick = this.handleShowAllClick.bind(this);

        this.products = ProductData;
        this.state = {
            numberOfTicks: 0,
            products: []
        };
    }

    componentDidMount(){
        this.interval = Observable.interval(1000).subscribe(() => this.setState((prevState) => ({numberOfTicks : prevState.numberOfTicks + 1})));
    }

    componentWillUnmount(){
        this.interval.unsubscribe();
    }

    handleShowAllClick(event){
        event.preventDefault();
        this.setState({ products: this.products });
    }

    handleShowLaptopsClick = (event) => {
        event.preventDefault();
        this.setState({ products: this.products.filter(c => c.category.toLowerCase() === 'laptop') });
    }

    handleShowDesktopsClick(event) {
        event.preventDefault();
        this.setState({ products: this.products.filter(c => c.category.toLowerCase() === 'desktop') });
    }

    render(){
        return (
            <div>
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <span className="text-center">Number of Ticks: {this.state.numberOfTicks}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <button className="btn btn-block btn-primary" onClick={this.handleShowAllClick}>All</button>
                    </div>
                    <div className="col-md-4">
                        <button className="btn btn-block btn-primary" onClick={this.handleShowLaptopsClick}>Laptops</button>
                    </div>
                    <div className="col-md-4">
                        <button className="btn btn-block btn-primary" onClick={(e) => this.handleShowDesktopsClick(e)}>Desktops</button>
                    </div>
                </div>
                {
                    this.state.products.map(product => {
                        return (
                            <ProductSummary key={product.id} id={product.id} product={product} />
                        )
                    })
                }
            </div>
        );
    }
}