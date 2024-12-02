const Delivery = require("../models/deliveryModel");
const Order = require("../models/ordersModel");
const {
  INVALID_CREDENTIALS,
  CREATED,
  LOGIN_SUCCESS,
  SUCCESS,
  SERVER_ERROR,
  BAD_REQUEST,
  NOT_FOUND,
  UPDATED,
  LOGOUT_SUCCESS,
} = require("../utils/masages");
const createToken = require("./createToken");
const valiedetionError = require("./valiedetionErrors");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const login = await Delivery.login(email, password);
    // console.log("login logged in => x", login);
    const token = createToken(login._id);
    res.cookie("deliveryJWT", token, {
      httpOnly: true,
    });
    res.status(200).json({
      LOGIN_SUCCESS,
      data: {
        id: login._id,
        name: login.name,
        email: login.email,
        gender: login.gender,
        age: login.age,
        orders: login.orders,
      },
    });
  } catch (error) {
    const errors = valiedetionError(error);
    res.status(500).json({ INVALID_CREDENTIALS, errors });
  }
};
const signup = async (req, res) => {
  try {
    const { name, email, password, gender, age } = req.body;
    const signup = await Delivery.create({
      name,
      email,
      password,
      gender,
      age,
    });
    const token = createToken(signup._id);
    res.cookie("deliveryJWT", token, {
      httpOnly: true,
    });

    res.status(201).json({
      CREATED,
      data: {
        id: signup._id,
        name: signup.name,
        email: signup.email,
        gender: signup.gender,
        age: signup.age,
        orders: signup.orders,
      },
    });
  } catch (err) {
    const error = valiedetionError(err);
    res.status(500).json({ INVALID_CREDENTIALS, error });
  }
};
const logout = (req, res) => {
  try {
    res.clearCookie("deliveryJWT");
    res.status(200).json({ LOGOUT_SUCCESS, msg: "logged out" });
  } catch (error) {
    res.status(500).json({ msg: "logout failed", error });
  }
};
const deliverys = async (req, res) => {
  try {
    const deliverys = await Delivery.find();
    res.status(200).json({ SUCCESS, data: deliverys });
  } catch (error) {
    res.status(500).json({ SERVER_ERROR, error: error.message });
  }
};
const delivery = async (req, res) => {
  try {
    const { id } = req.params;
    const delivery = await Delivery.findById(id);
    res.status(200).json({ SUCCESS, data: delivery });
  } catch (error) {
    res.status(500).json({ SERVER_ERROR, error });
  }
};
const deliveryOrders = async (req, res) => {
  try {
    const deliveryId = req.params.id;
    const deliveryOrders = await Delivery.findById(deliveryId, "orders name");
    res.status(200).json({ SUCCESS, data: deliveryOrders });
  } catch (error) {
    res.status(SERVER_ERROR.code).json({ SERVER_ERROR, errors: error.message });
  }
};
const addOrder = async (req, res) => {
  try {
    const deliveryId = req.params.id;
    const orderId = req.body;

    const delivery = await Delivery.findById(deliveryId);

    if (!delivery) {
      return res.status(404).json({ NOT_FOUND, message: "delivery not found" });
    }

    const orderExists = delivery.orders.some(
      (o) => o._id.toString() === orderId.id
    );

    if (orderExists) {
      return res
        .status(400)
        .json({ BAD_REQUEST, message: "order already added to the delivery" });
    }

    const orderdata = await Order.findById(orderId.id);

    if (!orderdata) {
      return res.status(404).json({ NOT_FOUND, message: "order not found" });
    }

    const updatedDelivery = await Delivery.findByIdAndUpdate(
      deliveryId,
      { $push: { orders: orderdata } },
      { new: true }
    );

    res.status(201).json({ success: true, data: updatedDelivery });
  } catch (error) {
    res.status(500).json({ SERVER_ERROR, message: error.message });
  }
};
const updataOrderStatus = async (req, res) => {
  try {
    const deliveryId = req.params.id;
    const { orderId, status } = req.body;

    const validStatuses = ["pending", "shipped", "celivered", "cancelled"];
    if (!validStatuses.includes(status)) {
      return res
        .status(BAD_REQUEST.code)
        .json({ BAD_REQUEST, error: "Invalid status value." });
    }

    const deliveryOrders = await Delivery.findById(deliveryId, "orders");

    const arrOrders = [];
    deliveryOrders.orders.map((o) => {
      const oId = o._id.toString();
      arrOrders.push(oId);
    });
    const data = {
      order: {
        status: "",
        order: [],
      },
      delivery: {
        status: "",
        order: [],
      },
    };
    if (arrOrders.includes(orderId)) {
      await Order.findByIdAndUpdate(
        orderId,
        { status },
        {
          new: true,
        }
      ).then((res) => {
        data.order.status = res.status;
        data.order.order = res;
      });
      await Delivery.findOneAndUpdate(
        { _id: deliveryId, "orders._id": orderId }, // البحث عن Delivery وطلبه المحدد
        { $set: { "orders.$.status": status } }, // تحديث الحالة باستخدام معامل `$`
        { new: true } // إرجاع الوثيقة بعد التحديث
      ).then((res) => {
        const arrOrd = res.orders;
        arrOrd.forEach((e) => {
          if (orderId === e.id) {
            data.delivery.status = e.status;
            data.delivery.order = e;
          }
        });
      });
      res.status(UPDATED.code).json({
        UPDATED,
        data,
      });
    } else {
      res
        .status(BAD_REQUEST.code)
        .json({ BAD_REQUEST, error: "orders id is not valid!" });
    }
  } catch (error) {
    res.status(SERVER_ERROR.code).json({ SERVER_ERROR, error: error.message });
  }
};

module.exports = {
  login,
  signup,
  logout,
  deliverys,
  delivery,
  deliveryOrders,
  addOrder,
  updataOrderStatus,
};
