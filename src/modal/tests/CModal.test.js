import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer';

import CModal from '../CModal'

configure({ adapter: new Adapter() })

describe('CModal', () => {
  it('renders basic wrapper correctly', () => {
    const component = renderer.create(<CModal/>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot()
  })
  it('renders customized wrapper correctly', () => {
    const componentCustomized = renderer.create(
      <CModal
        className='class-name'
        show
        centered
        size='lg'
        backdrop
        color='warning'
        borderColor='info'
        fade
        closeOnBackdrop
        addContentClass='content-class'
      >
        CModal
      </CModal>
    );
    let tree = componentCustomized.toJSON();
    expect(tree).toMatchSnapshot()
  })
  it('run onClose function after click modal', () => {
    jest.useFakeTimers()
    const onClose = jest.fn();
    const component = mount(
      
        <CModal
          className='class-name'
          onClose={onClose}
          closeOnBackdrop
          show
        >
          CModal
        </CModal>
    );
    component.find('.modal').simulate('click')
    jest.runAllTimers();
    expect(onClose).toHaveBeenCalledTimes(1);
  })
})