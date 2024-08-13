/*
 * Copyright (c) 2014-2024 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import { type Request, type Response } from 'express'
import { AddressModel } from '../models/address'

module.exports.getAddress = function getAddress () {
  return async (req: Request, res: Response) => {
    if (!req.user?.id) {
      return res.status(401).json({ status: 'error', data: 'Unauthorized' })
    }
    const addresses = await AddressModel.findAll({ where: { UserId: req.user.id } })
    res.status(200).json({ status: 'success', data: addresses })
  }
}

module.exports.getAddressById = function getAddressById () {
  return async (req: Request, res: Response) => {
    if (!req.user?.id) {
      return res.status(401).json({ status: 'error', data: 'Unauthorized' })
    }
    const address = await AddressModel.findOne({ where: { id: req.params.id, UserId: req.user.id } })
    if (address != null) {
      res.status(200).json({ status: 'success', data: address })
    } else {
      res.status(404).json({ status: 'error', data: 'Address not found.' })
    }
  }
}

module.exports.delAddressById = function delAddressById () {
  return async (req: Request, res: Response) => {
    if (!req.user?.id) {
      return res.status(401).json({ status: 'error', data: 'Unauthorized' })
    }
    const address = await AddressModel.destroy({ where: { id: req.params.id, UserId: req.user.id } })
    if (address) {
      res.status(200).json({ status: 'success', data: 'Address deleted successfully.' })
    } else {
      res.status(404).json({ status: 'error', data: 'Address not found.' })
    }
  }
}
