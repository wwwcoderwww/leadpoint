export default {
  cfg: [{
    coMagic: {},
    name: "SmartCallback.ru - тестирование №1",
    smartCallback: {
      clientId: 500,
      domainId: 2000,
      phone: 79998790934,
      text_with: "Текст, который будет проговорен с включенным действием оператора.",
      text_without: "Текст, который будет проговорен с отключенным действием оператора."
    },
    useService: "skb",
    _id: "5b87a00c70a35975fb4f9440"
  }, {
    coMagic: {},
    name: "SmartCallback.ru - тестирование №2 ",
    smartCallback: {
      clientId: 500,
      domainId: 2000,
      phone: 79894560708
    },
    useService: "skb",
    _id: "5b87a08570a35975fb4f9443"
  }, {
    coMagic: {
      action: false,
      direction: "in",
      employee_id: 419625,
      employee_msg: "",
      employee_phone: "799998712368",
      first_call: "employee",
      virtual_phone_number: "78126047233",
    },
    name: "CoMagic.ru - тестирование №1",
    smartCallback: {},
    useService: "co",
    _id: "5b87a0fc70a35975fb4f9446"
  }, {
    coMagic: {
      action: true,
      direction: "in",
      employee_id: 419625,
      employee_msg: "",
      first_call: "contact",
      virtual_phone_number: "78126047233"
    },
    name: "CoMagic.ru - тестирование №4",
    smartCallback: {},
    useService: "co",
    _id: "5b87a14a70a35975fb4f9449"
  }]
}
