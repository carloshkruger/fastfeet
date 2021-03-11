import { FieldRequiredError } from '@core/errors'
import { CPF } from '@domain/CPF'
import { InvalidCPFError } from '@domain/errors/InvalidCPFError'

describe('CPF validation', () => {
  it('should not create a CPF instance with invalid value (incorrect number length)', () => {
    expect(() => CPF.create({ value: '999.999.999' })).toThrow(
      new InvalidCPFError('999.999.999')
    )
    expect(() => CPF.create({ value: '9' })).toThrow(new InvalidCPFError('9'))
    expect(() => CPF.create({ value: '99' })).toThrow(new InvalidCPFError('99'))
    expect(() => CPF.create({ value: '999' })).toThrow(
      new InvalidCPFError('999')
    )
    expect(() => CPF.create({ value: '999.999' })).toThrow(
      new InvalidCPFError('999.999')
    )
    expect(() => CPF.create({ value: '999.999.999' })).toThrow(
      new InvalidCPFError('999.999.999')
    )
    expect(() => CPF.create({ value: '999.999.999-9' })).toThrow(
      new InvalidCPFError('999.999.999-9')
    )
  })

  it('should not create a CPF instance with invalid value', () => {
    expect(() => CPF.create({ value: '123.456.789-12' })).toThrow(
      new InvalidCPFError('123.456.789-12')
    )
  })

  it('should not create a CPF instance with invalid value (using only one number)', () => {
    for (let i = 0; i <= 9; i++) {
      const value = `${i}${i}${i}.${i}${i}${i}.${i}${i}${i}-${i}${i}`
      expect(() => CPF.create({ value })).toThrow(new InvalidCPFError(value))
    }
  })

  it('should not create a CPF instance with invalid value (with letters)', () => {
    const incorrectCPF = '999.999.999-aa'
    expect(() => CPF.create({ value: incorrectCPF })).toThrow(
      new InvalidCPFError(incorrectCPF)
    )
  })

  it('should not create a CPF instance with invalid value (with empty string)', () => {
    const incorrectCPF = ''
    expect(() => CPF.create({ value: incorrectCPF })).toThrow(
      new FieldRequiredError('CPF')
    )
  })

  it('should not create a CPF instance with invalid value (with blank value)', () => {
    const incorrectCPF = ' '
    expect(() => CPF.create({ value: incorrectCPF })).toThrow(
      new FieldRequiredError('CPF')
    )
  })

  it('should create a CPF instance with valid value (with numbers only)', () => {
    const validCPFWithOnlyNumbers = '39782449008'

    const cpf = CPF.create({ value: validCPFWithOnlyNumbers })

    expect(cpf).toBeInstanceOf(CPF)
    expect(cpf.value).toBe(validCPFWithOnlyNumbers)
  })

  it('should create a CPF instance with valid value (with non numeric characters)', () => {
    const validCPFWithOnlyNumbers = '39782449008'
    const validCPFWithNonNumericCharacters = '397.824.490-08'

    const cpf = CPF.create({ value: validCPFWithNonNumericCharacters })

    expect(cpf).toBeInstanceOf(CPF)
    expect(cpf.value).toBe(validCPFWithOnlyNumbers)
  })

  it('should not create a CPF instance with invalid values', () => {
    expect(() => CPF.create({ value: '13467287475' })).toThrow(
      new InvalidCPFError('13467287475')
    )
    expect(() => CPF.create({ value: '16164626669' })).toThrow(
      new InvalidCPFError('16164626669')
    )
    expect(() => CPF.create({ value: '77345324931' })).toThrow(
      new InvalidCPFError('77345324931')
    )
    expect(() => CPF.create({ value: '09485461700' })).toThrow(
      new InvalidCPFError('09485461700')
    )
    expect(() => CPF.create({ value: '35829304160' })).toThrow(
      new InvalidCPFError('35829304160')
    )
    expect(() => CPF.create({ value: '56314061207' })).toThrow(
      new InvalidCPFError('56314061207')
    )
    expect(() => CPF.create({ value: '27546021212' })).toThrow(
      new InvalidCPFError('27546021212')
    )
    expect(() => CPF.create({ value: '84501001386' })).toThrow(
      new InvalidCPFError('84501001386')
    )
    expect(() => CPF.create({ value: '55041609433' })).toThrow(
      new InvalidCPFError('55041609433')
    )
    expect(() => CPF.create({ value: '48500127436' })).toThrow(
      new InvalidCPFError('48500127436')
    )
    expect(() => CPF.create({ value: '14161174891' })).toThrow(
      new InvalidCPFError('14161174891')
    )
    expect(() => CPF.create({ value: '90013612369' })).toThrow(
      new InvalidCPFError('90013612369')
    )
    expect(() => CPF.create({ value: '16115341338' })).toThrow(
      new InvalidCPFError('16115341338')
    )
    expect(() => CPF.create({ value: '30909409771' })).toThrow(
      new InvalidCPFError('30909409771')
    )
    expect(() => CPF.create({ value: '14933936001' })).toThrow(
      new InvalidCPFError('14933936001')
    )
    expect(() => CPF.create({ value: '03816444111' })).toThrow(
      new InvalidCPFError('03816444111')
    )
    expect(() => CPF.create({ value: '09346038000' })).toThrow(
      new InvalidCPFError('09346038000')
    )
    expect(() => CPF.create({ value: '04535034202' })).toThrow(
      new InvalidCPFError('04535034202')
    )
    expect(() => CPF.create({ value: '01863581358' })).toThrow(
      new InvalidCPFError('01863581358')
    )
    expect(() => CPF.create({ value: '24947920386' })).toThrow(
      new InvalidCPFError('24947920386')
    )
    expect(() => CPF.create({ value: '09706001079' })).toThrow(
      new InvalidCPFError('09706001079')
    )
    expect(() => CPF.create({ value: '89841660526' })).toThrow(
      new InvalidCPFError('89841660526')
    )
    expect(() => CPF.create({ value: '81400105226' })).toThrow(
      new InvalidCPFError('81400105226')
    )
    expect(() => CPF.create({ value: '24160856168' })).toThrow(
      new InvalidCPFError('24160856168')
    )
    expect(() => CPF.create({ value: '10013219301' })).toThrow(
      new InvalidCPFError('10013219301')
    )
    expect(() => CPF.create({ value: '21039687794' })).toThrow(
      new InvalidCPFError('21039687794')
    )
    expect(() => CPF.create({ value: '12480161831' })).toThrow(
      new InvalidCPFError('12480161831')
    )
    expect(() => CPF.create({ value: '16288165300' })).toThrow(
      new InvalidCPFError('16288165300')
    )
    expect(() => CPF.create({ value: '23733574164' })).toThrow(
      new InvalidCPFError('23733574164')
    )
    expect(() => CPF.create({ value: '77540760105' })).toThrow(
      new InvalidCPFError('77540760105')
    )
    expect(() => CPF.create({ value: '31808499152' })).toThrow(
      new InvalidCPFError('31808499152')
    )
    expect(() => CPF.create({ value: '27565010998' })).toThrow(
      new InvalidCPFError('27565010998')
    )
    expect(() => CPF.create({ value: '97710820691' })).toThrow(
      new InvalidCPFError('97710820691')
    )
    expect(() => CPF.create({ value: '67637127706' })).toThrow(
      new InvalidCPFError('67637127706')
    )
    expect(() => CPF.create({ value: '84501657409' })).toThrow(
      new InvalidCPFError('84501657409')
    )
    expect(() => CPF.create({ value: '54600125271' })).toThrow(
      new InvalidCPFError('54600125271')
    )
    expect(() => CPF.create({ value: '94161484784' })).toThrow(
      new InvalidCPFError('94161484784')
    )
    expect(() => CPF.create({ value: '03984456180' })).toThrow(
      new InvalidCPFError('03984456180')
    )
    expect(() => CPF.create({ value: '16098917109' })).toThrow(
      new InvalidCPFError('16098917109')
    )
    expect(() => CPF.create({ value: '18838424112' })).toThrow(
      new InvalidCPFError('18838424112')
    )
    expect(() => CPF.create({ value: '22747774270' })).toThrow(
      new InvalidCPFError('22747774270')
    )
    expect(() => CPF.create({ value: '84519491161' })).toThrow(
      new InvalidCPFError('84519491161')
    )
    expect(() => CPF.create({ value: '13106910516' })).toThrow(
      new InvalidCPFError('13106910516')
    )
    expect(() => CPF.create({ value: '42761416641' })).toThrow(
      new InvalidCPFError('42761416641')
    )
    expect(() => CPF.create({ value: '64131127469' })).toThrow(
      new InvalidCPFError('64131127469')
    )
    expect(() => CPF.create({ value: '52051612751' })).toThrow(
      new InvalidCPFError('52051612751')
    )
    expect(() => CPF.create({ value: '69270319630' })).toThrow(
      new InvalidCPFError('69270319630')
    )
    expect(() => CPF.create({ value: '47212134141' })).toThrow(
      new InvalidCPFError('47212134141')
    )
    expect(() => CPF.create({ value: '41274062045' })).toThrow(
      new InvalidCPFError('41274062045')
    )
    expect(() => CPF.create({ value: '20633226778' })).toThrow(
      new InvalidCPFError('20633226778')
    )
    expect(() => CPF.create({ value: '13346876401' })).toThrow(
      new InvalidCPFError('13346876401')
    )
    expect(() => CPF.create({ value: '00329504670' })).toThrow(
      new InvalidCPFError('00329504670')
    )
    expect(() => CPF.create({ value: '08112565548' })).toThrow(
      new InvalidCPFError('08112565548')
    )
    expect(() => CPF.create({ value: '17816086587' })).toThrow(
      new InvalidCPFError('17816086587')
    )
    expect(() => CPF.create({ value: '21376633254' })).toThrow(
      new InvalidCPFError('21376633254')
    )
    expect(() => CPF.create({ value: '91611257432' })).toThrow(
      new InvalidCPFError('91611257432')
    )
    expect(() => CPF.create({ value: '00113667564' })).toThrow(
      new InvalidCPFError('00113667564')
    )
    expect(() => CPF.create({ value: '36406929650' })).toThrow(
      new InvalidCPFError('36406929650')
    )
    expect(() => CPF.create({ value: '10703708421' })).toThrow(
      new InvalidCPFError('10703708421')
    )
    expect(() => CPF.create({ value: '08044003001' })).toThrow(
      new InvalidCPFError('08044003001')
    )
    expect(() => CPF.create({ value: '70479741611' })).toThrow(
      new InvalidCPFError('70479741611')
    )
    expect(() => CPF.create({ value: '50986411997' })).toThrow(
      new InvalidCPFError('50986411997')
    )
    expect(() => CPF.create({ value: '20406236817' })).toThrow(
      new InvalidCPFError('20406236817')
    )
    expect(() => CPF.create({ value: '79311332143' })).toThrow(
      new InvalidCPFError('79311332143')
    )
    expect(() => CPF.create({ value: '46416150347' })).toThrow(
      new InvalidCPFError('46416150347')
    )
    expect(() => CPF.create({ value: '50001336376' })).toThrow(
      new InvalidCPFError('50001336376')
    )
    expect(() => CPF.create({ value: '42034990623' })).toThrow(
      new InvalidCPFError('42034990623')
    )
    expect(() => CPF.create({ value: '31151984881' })).toThrow(
      new InvalidCPFError('31151984881')
    )
    expect(() => CPF.create({ value: '14062272800' })).toThrow(
      new InvalidCPFError('14062272800')
    )
    expect(() => CPF.create({ value: '28824654161' })).toThrow(
      new InvalidCPFError('28824654161')
    )
    expect(() => CPF.create({ value: '01246141238' })).toThrow(
      new InvalidCPFError('01246141238')
    )
    expect(() => CPF.create({ value: '44680816098' })).toThrow(
      new InvalidCPFError('44680816098')
    )
    expect(() => CPF.create({ value: '94229001250' })).toThrow(
      new InvalidCPFError('94229001250')
    )
    expect(() => CPF.create({ value: '86041609615' })).toThrow(
      new InvalidCPFError('86041609615')
    )
    expect(() => CPF.create({ value: '70100134669' })).toThrow(
      new InvalidCPFError('70100134669')
    )
    expect(() => CPF.create({ value: '64161067284' })).toThrow(
      new InvalidCPFError('64161067284')
    )
    expect(() => CPF.create({ value: '80013491374' })).toThrow(
      new InvalidCPFError('80013491374')
    )
    expect(() => CPF.create({ value: '20033926007' })).toThrow(
      new InvalidCPFError('20033926007')
    )
    expect(() => CPF.create({ value: '72909141612' })).toThrow(
      new InvalidCPFError('72909141612')
    )
    expect(() => CPF.create({ value: '01670311437' })).toThrow(
      new InvalidCPFError('01670311437')
    )
    expect(() => CPF.create({ value: '97510161376' })).toThrow(
      new InvalidCPFError('97510161376')
    )
    expect(() => CPF.create({ value: '28871525211' })).toThrow(
      new InvalidCPFError('28871525211')
    )
    expect(() => CPF.create({ value: '64402075311' })).toThrow(
      new InvalidCPFError('64402075311')
    )
    expect(() => CPF.create({ value: '05011228387' })).toThrow(
      new InvalidCPFError('05011228387')
    )
    expect(() => CPF.create({ value: '35207527169' })).toThrow(
      new InvalidCPFError('35207527169')
    )
    expect(() => CPF.create({ value: '41213336442' })).toThrow(
      new InvalidCPFError('41213336442')
    )
    expect(() => CPF.create({ value: '21231486696' })).toThrow(
      new InvalidCPFError('21231486696')
    )
    expect(() => CPF.create({ value: '14040114481' })).toThrow(
      new InvalidCPFError('14040114481')
    )
    expect(() => CPF.create({ value: '27594229153' })).toThrow(
      new InvalidCPFError('27594229153')
    )
    expect(() => CPF.create({ value: '35578456164' })).toThrow(
      new InvalidCPFError('35578456164')
    )
    expect(() => CPF.create({ value: '71820710713' })).toThrow(
      new InvalidCPFError('71820710713')
    )
    expect(() => CPF.create({ value: '39134216235' })).toThrow(
      new InvalidCPFError('39134216235')
    )
    expect(() => CPF.create({ value: '59655132739' })).toThrow(
      new InvalidCPFError('59655132739')
    )
    expect(() => CPF.create({ value: '64871651130' })).toThrow(
      new InvalidCPFError('64871651130')
    )
    expect(() => CPF.create({ value: '37805008569' })).toThrow(
      new InvalidCPFError('37805008569')
    )
    expect(() => CPF.create({ value: '05164276473' })).toThrow(
      new InvalidCPFError('05164276473')
    )
    expect(() => CPF.create({ value: '81346728747' })).toThrow(
      new InvalidCPFError('81346728747')
    )
    expect(() => CPF.create({ value: '20124316373' })).toThrow(
      new InvalidCPFError('20124316373')
    )
    expect(() => CPF.create({ value: '70633564031' })).toThrow(
      new InvalidCPFError('70633564031')
    )
    expect(() => CPF.create({ value: '46302632313' })).toThrow(
      new InvalidCPFError('46302632313')
    )
    expect(() => CPF.create({ value: '00504542616' })).toThrow(
      new InvalidCPFError('00504542616')
    )
    expect(() => CPF.create({ value: '99543836711' })).toThrow(
      new InvalidCPFError('99543836711')
    )
    expect(() => CPF.create({ value: '40365401161' })).toThrow(
      new InvalidCPFError('40365401161')
    )
    expect(() => CPF.create({ value: '27710561222' })).toThrow(
      new InvalidCPFError('27710561222')
    )
    expect(() => CPF.create({ value: '89434652075' })).toThrow(
      new InvalidCPFError('89434652075')
    )
    expect(() => CPF.create({ value: '97880711200' })).toThrow(
      new InvalidCPFError('97880711200')
    )
    expect(() => CPF.create({ value: '48444161048' })).toThrow(
      new InvalidCPFError('48444161048')
    )
    expect(() => CPF.create({ value: '12431610480' })).toThrow(
      new InvalidCPFError('12431610480')
    )
    expect(() => CPF.create({ value: '24316104801' })).toThrow(
      new InvalidCPFError('24316104801')
    )
    expect(() => CPF.create({ value: '43161048012' })).toThrow(
      new InvalidCPFError('43161048012')
    )
    expect(() => CPF.create({ value: '31612149537' })).toThrow(
      new InvalidCPFError('31612149537')
    )
    expect(() => CPF.create({ value: '01228827545' })).toThrow(
      new InvalidCPFError('01228827545')
    )
    expect(() => CPF.create({ value: '60857542571' })).toThrow(
      new InvalidCPFError('60857542571')
    )
    expect(() => CPF.create({ value: '02399740316' })).toThrow(
      new InvalidCPFError('02399740316')
    )
    expect(() => CPF.create({ value: '14226686770' })).toThrow(
      new InvalidCPFError('14226686770')
    )
    expect(() => CPF.create({ value: '92250651609' })).toThrow(
      new InvalidCPFError('92250651609')
    )
    expect(() => CPF.create({ value: '22506516108' })).toThrow(
      new InvalidCPFError('22506516108')
    )
    expect(() => CPF.create({ value: '83852071340' })).toThrow(
      new InvalidCPFError('83852071340')
    )
    expect(() => CPF.create({ value: '44731611388' })).toThrow(
      new InvalidCPFError('44731611388')
    )
    expect(() => CPF.create({ value: '67271107135' })).toThrow(
      new InvalidCPFError('67271107135')
    )
    expect(() => CPF.create({ value: '90160820811' })).toThrow(
      new InvalidCPFError('90160820811')
    )
    expect(() => CPF.create({ value: '41323914342' })).toThrow(
      new InvalidCPFError('41323914342')
    )
    expect(() => CPF.create({ value: '21205481097' })).toThrow(
      new InvalidCPFError('21205481097')
    )
    expect(() => CPF.create({ value: '01202402942' })).toThrow(
      new InvalidCPFError('01202402942')
    )
    expect(() => CPF.create({ value: '95896375910' })).toThrow(
      new InvalidCPFError('95896375910')
    )
    expect(() => CPF.create({ value: '74293477160' })).toThrow(
      new InvalidCPFError('74293477160')
    )
    expect(() => CPF.create({ value: '86921820012' })).toThrow(
      new InvalidCPFError('86921820012')
    )
    expect(() => CPF.create({ value: '44039416095' })).toThrow(
      new InvalidCPFError('44039416095')
    )
    expect(() => CPF.create({ value: '71452120225' })).toThrow(
      new InvalidCPFError('71452120225')
    )
    expect(() => CPF.create({ value: '24042003594' })).toThrow(
      new InvalidCPFError('24042003594')
    )
    expect(() => CPF.create({ value: '81300116486' })).toThrow(
      new InvalidCPFError('81300116486')
    )
    expect(() => CPF.create({ value: '84128427444' })).toThrow(
      new InvalidCPFError('84128427444')
    )
    expect(() => CPF.create({ value: '61330268546' })).toThrow(
      new InvalidCPFError('61330268546')
    )
    expect(() => CPF.create({ value: '16089582590' })).toThrow(
      new InvalidCPFError('16089582590')
    )
    expect(() => CPF.create({ value: '34754754372' })).toThrow(
      new InvalidCPFError('34754754372')
    )
    expect(() => CPF.create({ value: '78994722071' })).toThrow(
      new InvalidCPFError('78994722071')
    )
    expect(() => CPF.create({ value: '23144511611' })).toThrow(
      new InvalidCPFError('23144511611')
    )
    expect(() => CPF.create({ value: '52529400122' })).toThrow(
      new InvalidCPFError('52529400122')
    )
    expect(() => CPF.create({ value: '20394160947' })).toThrow(
      new InvalidCPFError('20394160947')
    )
    expect(() => CPF.create({ value: '89201356651' })).toThrow(
      new InvalidCPFError('89201356651')
    )
    expect(() => CPF.create({ value: '48416095784' })).toThrow(
      new InvalidCPFError('48416095784')
    )
    expect(() => CPF.create({ value: '68093490593' })).toThrow(
      new InvalidCPFError('68093490593')
    )
    expect(() => CPF.create({ value: '12075346442' })).toThrow(
      new InvalidCPFError('12075346442')
    )
    expect(() => CPF.create({ value: '11780228475' })).toThrow(
      new InvalidCPFError('11780228475')
    )
    expect(() => CPF.create({ value: '61241129071' })).toThrow(
      new InvalidCPFError('61241129071')
    )
    expect(() => CPF.create({ value: '93181649520' })).toThrow(
      new InvalidCPFError('93181649520')
    )
    expect(() => CPF.create({ value: '43986528130' })).toThrow(
      new InvalidCPFError('43986528130')
    )
    expect(() => CPF.create({ value: '94544022032' })).toThrow(
      new InvalidCPFError('94544022032')
    )
    expect(() => CPF.create({ value: '25221801388' })).toThrow(
      new InvalidCPFError('25221801388')
    )
    expect(() => CPF.create({ value: '35722801337' })).toThrow(
      new InvalidCPFError('35722801337')
    )
    expect(() => CPF.create({ value: '57437203188' })).toThrow(
      new InvalidCPFError('57437203188')
    )
    expect(() => CPF.create({ value: '61981307862' })).toThrow(
      new InvalidCPFError('61981307862')
    )
    expect(() => CPF.create({ value: '44816084818' })).toThrow(
      new InvalidCPFError('44816084818')
    )
    expect(() => CPF.create({ value: '23010155722' })).toThrow(
      new InvalidCPFError('23010155722')
    )
    expect(() => CPF.create({ value: '43516156251' })).toThrow(
      new InvalidCPFError('43516156251')
    )
    expect(() => CPF.create({ value: '94001238420' })).toThrow(
      new InvalidCPFError('94001238420')
    )
    expect(() => CPF.create({ value: '41309298246' })).toThrow(
      new InvalidCPFError('41309298246')
    )
    expect(() => CPF.create({ value: '16161025540' })).toThrow(
      new InvalidCPFError('16161025540')
    )
    expect(() => CPF.create({ value: '07533386151' })).toThrow(
      new InvalidCPFError('07533386151')
    )
    expect(() => CPF.create({ value: '11053645716' })).toThrow(
      new InvalidCPFError('11053645716')
    )
    expect(() => CPF.create({ value: '43153990137' })).toThrow(
      new InvalidCPFError('43153990137')
    )
    expect(() => CPF.create({ value: '79245301612' })).toThrow(
      new InvalidCPFError('79245301612')
    )
    expect(() => CPF.create({ value: '23953500128' })).toThrow(
      new InvalidCPFError('23953500128')
    )
    expect(() => CPF.create({ value: '57414212073' })).toThrow(
      new InvalidCPFError('57414212073')
    )
    expect(() => CPF.create({ value: '44600120292' })).toThrow(
      new InvalidCPFError('44600120292')
    )
    expect(() => CPF.create({ value: '46316246877' })).toThrow(
      new InvalidCPFError('46316246877')
    )
    expect(() => CPF.create({ value: '51066808994' })).toThrow(
      new InvalidCPFError('51066808994')
    )
    expect(() => CPF.create({ value: '11401617387' })).toThrow(
      new InvalidCPFError('11401617387')
    )
    expect(() => CPF.create({ value: '70731654497' })).toThrow(
      new InvalidCPFError('70731654497')
    )
    expect(() => CPF.create({ value: '62495502680' })).toThrow(
      new InvalidCPFError('62495502680')
    )
    expect(() => CPF.create({ value: '10956094416' })).toThrow(
      new InvalidCPFError('10956094416')
    )
    expect(() => CPF.create({ value: '65665767001' })).toThrow(
      new InvalidCPFError('65665767001')
    )
    expect(() => CPF.create({ value: '67864142006' })).toThrow(
      new InvalidCPFError('67864142006')
    )
    expect(() => CPF.create({ value: '23812001251' })).toThrow(
      new InvalidCPFError('23812001251')
    )
    expect(() => CPF.create({ value: '58924200736' })).toThrow(
      new InvalidCPFError('58924200736')
    )
    expect(() => CPF.create({ value: '89060579309' })).toThrow(
      new InvalidCPFError('89060579309')
    )
    expect(() => CPF.create({ value: '46212228433' })).toThrow(
      new InvalidCPFError('46212228433')
    )
    expect(() => CPF.create({ value: '00135254144' })).toThrow(
      new InvalidCPFError('00135254144')
    )
    expect(() => CPF.create({ value: '63124940720' })).toThrow(
      new InvalidCPFError('63124940720')
    )
    expect(() => CPF.create({ value: '13491621416' })).toThrow(
      new InvalidCPFError('13491621416')
    )
    expect(() => CPF.create({ value: '14448580129' })).toThrow(
      new InvalidCPFError('14448580129')
    )
    expect(() => CPF.create({ value: '02274742004' })).toThrow(
      new InvalidCPFError('02274742004')
    )
    expect(() => CPF.create({ value: '77712813269' })).toThrow(
      new InvalidCPFError('77712813269')
    )
    expect(() => CPF.create({ value: '09416162258' })).toThrow(
      new InvalidCPFError('09416162258')
    )
    expect(() => CPF.create({ value: '13430010933' })).toThrow(
      new InvalidCPFError('13430010933')
    )
    expect(() => CPF.create({ value: '26416323363' })).toThrow(
      new InvalidCPFError('26416323363')
    )
    expect(() => CPF.create({ value: '68133049929' })).toThrow(
      new InvalidCPFError('68133049929')
    )
    expect(() => CPF.create({ value: '36210396370' })).toThrow(
      new InvalidCPFError('36210396370')
    )
    expect(() => CPF.create({ value: '01363403423' })).toThrow(
      new InvalidCPFError('01363403423')
    )
    expect(() => CPF.create({ value: '09963276780' })).toThrow(
      new InvalidCPFError('09963276780')
    )
    expect(() => CPF.create({ value: '71264844861' })).toThrow(
      new InvalidCPFError('71264844861')
    )
    expect(() => CPF.create({ value: '31616158270' })).toThrow(
      new InvalidCPFError('31616158270')
    )
    expect(() => CPF.create({ value: '50866400203' })).toThrow(
      new InvalidCPFError('50866400203')
    )
    expect(() => CPF.create({ value: '05529870108' })).toThrow(
      new InvalidCPFError('05529870108')
    )
    expect(() => CPF.create({ value: '44102920039' })).toThrow(
      new InvalidCPFError('44102920039')
    )
    expect(() => CPF.create({ value: '34225714523' })).toThrow(
      new InvalidCPFError('34225714523')
    )
    expect(() => CPF.create({ value: '04052068170' })).toThrow(
      new InvalidCPFError('04052068170')
    )
    expect(() => CPF.create({ value: '01801157152' })).toThrow(
      new InvalidCPFError('01801157152')
    )
    expect(() => CPF.create({ value: '59237369371' })).toThrow(
      new InvalidCPFError('59237369371')
    )
    expect(() => CPF.create({ value: '61032020049' })).toThrow(
      new InvalidCPFError('61032020049')
    )
    expect(() => CPF.create({ value: '23743366025' })).toThrow(
      new InvalidCPFError('23743366025')
    )
    expect(() => CPF.create({ value: '12253474442' })).toThrow(
      new InvalidCPFError('12253474442')
    )
    expect(() => CPF.create({ value: '04089071911' })).toThrow(
      new InvalidCPFError('04089071911')
    )
    expect(() => CPF.create({ value: '74624601163' })).toThrow(
      new InvalidCPFError('74624601163')
    )
    expect(() => CPF.create({ value: '49896750135' })).toThrow(
      new InvalidCPFError('49896750135')
    )
    expect(() => CPF.create({ value: '76548020668' })).toThrow(
      new InvalidCPFError('76548020668')
    )
    expect(() => CPF.create({ value: '06337448198' })).toThrow(
      new InvalidCPFError('06337448198')
    )
    expect(() => CPF.create({ value: '28361625092' })).toThrow(
      new InvalidCPFError('28361625092')
    )
    expect(() => CPF.create({ value: '86426819104' })).toThrow(
      new InvalidCPFError('86426819104')
    )
    expect(() => CPF.create({ value: '37210399313' })).toThrow(
      new InvalidCPFError('37210399313')
    )
    expect(() => CPF.create({ value: '71266291348' })).toThrow(
      new InvalidCPFError('71266291348')
    )
    expect(() => CPF.create({ value: '23760999480' })).toThrow(
      new InvalidCPFError('23760999480')
    )
    expect(() => CPF.create({ value: '01292200841' })).toThrow(
      new InvalidCPFError('01292200841')
    )
    expect(() => CPF.create({ value: '22288538216' })).toThrow(
      new InvalidCPFError('22288538216')
    )
    expect(() => CPF.create({ value: '22885382206' })).toThrow(
      new InvalidCPFError('22885382206')
    )
    expect(() => CPF.create({ value: '62844590013' })).toThrow(
      new InvalidCPFError('62844590013')
    )
    expect(() => CPF.create({ value: '19374414364' })).toThrow(
      new InvalidCPFError('19374414364')
    )
    expect(() => CPF.create({ value: '74841627709' })).toThrow(
      new InvalidCPFError('74841627709')
    )
    expect(() => CPF.create({ value: '90001453442' })).toThrow(
      new InvalidCPFError('90001453442')
    )
    expect(() => CPF.create({ value: '60162820057' })).toThrow(
      new InvalidCPFError('60162820057')
    )
    expect(() => CPF.create({ value: '31259437994' })).toThrow(
      new InvalidCPFError('31259437994')
    )
    expect(() => CPF.create({ value: '22008783705' })).toThrow(
      new InvalidCPFError('22008783705')
    )
    expect(() => CPF.create({ value: '01328149481' })).toThrow(
      new InvalidCPFError('01328149481')
    )
    expect(() => CPF.create({ value: '62694209981' })).toThrow(
      new InvalidCPFError('62694209981')
    )
    expect(() => CPF.create({ value: '88684338320' })).toThrow(
      new InvalidCPFError('88684338320')
    )
    expect(() => CPF.create({ value: '54548701001' })).toThrow(
      new InvalidCPFError('54548701001')
    )
    expect(() => CPF.create({ value: '49996441625' })).toThrow(
      new InvalidCPFError('49996441625')
    )
    expect(() => CPF.create({ value: '12449812346' })).toThrow(
      new InvalidCPFError('12449812346')
    )
    expect(() => CPF.create({ value: '30460161899' })).toThrow(
      new InvalidCPFError('30460161899')
    )
    expect(() => CPF.create({ value: '56830918805' })).toThrow(
      new InvalidCPFError('56830918805')
    )
    expect(() => CPF.create({ value: '49616283739' })).toThrow(
      new InvalidCPFError('49616283739')
    )
    expect(() => CPF.create({ value: '66001331917' })).toThrow(
      new InvalidCPFError('66001331917')
    )
    expect(() => CPF.create({ value: '41627352861' })).toThrow(
      new InvalidCPFError('41627352861')
    )
    expect(() => CPF.create({ value: '71364054431' })).toThrow(
      new InvalidCPFError('71364054431')
    )
    expect(() => CPF.create({ value: '62679493120' })).toThrow(
      new InvalidCPFError('62679493120')
    )
    expect(() => CPF.create({ value: '13902650416' })).toThrow(
      new InvalidCPFError('13902650416')
    )
    expect(() => CPF.create({ value: '74442902128' })).toThrow(
      new InvalidCPFError('74442902128')
    )
    expect(() => CPF.create({ value: '80277400163' })).toThrow(
      new InvalidCPFError('80277400163')
    )
    expect(() => CPF.create({ value: '25722760070' })).toThrow(
      new InvalidCPFError('25722760070')
    )
    expect(() => CPF.create({ value: '68825420318' })).toThrow(
      new InvalidCPFError('68825420318')
    )
    expect(() => CPF.create({ value: '15415098496' })).toThrow(
      new InvalidCPFError('15415098496')
    )
    expect(() => CPF.create({ value: '34051630274' })).toThrow(
      new InvalidCPFError('34051630274')
    )
    expect(() => CPF.create({ value: '71206422401' })).toThrow(
      new InvalidCPFError('71206422401')
    )
    expect(() => CPF.create({ value: '96162392610' })).toThrow(
      new InvalidCPFError('96162392610')
    )
    expect(() => CPF.create({ value: '20013219562' })).toThrow(
      new InvalidCPFError('20013219562')
    )
    expect(() => CPF.create({ value: '23722345835' })).toThrow(
      new InvalidCPFError('23722345835')
    )
    expect(() => CPF.create({ value: '00971318842' })).toThrow(
      new InvalidCPFError('00971318842')
    )
    expect(() => CPF.create({ value: '72234583500' })).toThrow(
      new InvalidCPFError('72234583500')
    )
    expect(() => CPF.create({ value: '97131884162' })).toThrow(
      new InvalidCPFError('97131884162')
    )
    expect(() => CPF.create({ value: '23881560070' })).toThrow(
      new InvalidCPFError('23881560070')
    )
    expect(() => CPF.create({ value: '79190423717' })).toThrow(
      new InvalidCPFError('79190423717')
    )
    expect(() => CPF.create({ value: '23301132653' })).toThrow(
      new InvalidCPFError('23301132653')
    )
    expect(() => CPF.create({ value: '84061623496' })).toThrow(
      new InvalidCPFError('84061623496')
    )
    expect(() => CPF.create({ value: '22312533595' })).toThrow(
      new InvalidCPFError('22312533595')
    )
    expect(() => CPF.create({ value: '70162223460' })).toThrow(
      new InvalidCPFError('70162223460')
    )
    expect(() => CPF.create({ value: '41237193740' })).toThrow(
      new InvalidCPFError('41237193740')
    )
    expect(() => CPF.create({ value: '16262305417' })).toThrow(
      new InvalidCPFError('16262305417')
    )
    expect(() => CPF.create({ value: '13709227841' })).toThrow(
      new InvalidCPFError('13709227841')
    )
    expect(() => CPF.create({ value: '27395214111' })).toThrow(
      new InvalidCPFError('27395214111')
    )
    expect(() => CPF.create({ value: '12463406162' })).toThrow(
      new InvalidCPFError('12463406162')
    )
    expect(() => CPF.create({ value: '38369741336' })).toThrow(
      new InvalidCPFError('38369741336')
    )
    expect(() => CPF.create({ value: '40440316241' })).toThrow(
      new InvalidCPFError('40440316241')
    )
    expect(() => CPF.create({ value: '97676145508' })).toThrow(
      new InvalidCPFError('97676145508')
    )
    expect(() => CPF.create({ value: '64471633546' })).toThrow(
      new InvalidCPFError('64471633546')
    )
    expect(() => CPF.create({ value: '60165793093' })).toThrow(
      new InvalidCPFError('60165793093')
    )
    expect(() => CPF.create({ value: '90936924408' })).toThrow(
      new InvalidCPFError('90936924408')
    )
    expect(() => CPF.create({ value: '61627455839' })).toThrow(
      new InvalidCPFError('61627455839')
    )
    expect(() => CPF.create({ value: '13400277410' })).toThrow(
      new InvalidCPFError('13400277410')
    )
    expect(() => CPF.create({ value: '16224522279' })).toThrow(
      new InvalidCPFError('16224522279')
    )
    expect(() => CPF.create({ value: '15433604271' })).toThrow(
      new InvalidCPFError('15433604271')
    )
    expect(() => CPF.create({ value: '39911321100' })).toThrow(
      new InvalidCPFError('39911321100')
    )
    expect(() => CPF.create({ value: '35921214164' })).toThrow(
      new InvalidCPFError('35921214164')
    )
    expect(() => CPF.create({ value: '11867201362' })).toThrow(
      new InvalidCPFError('11867201362')
    )
    expect(() => CPF.create({ value: '63243916409' })).toThrow(
      new InvalidCPFError('63243916409')
    )
    expect(() => CPF.create({ value: '60902011608' })).toThrow(
      new InvalidCPFError('60902011608')
    )
    expect(() => CPF.create({ value: '34631643416' })).toThrow(
      new InvalidCPFError('34631643416')
    )
    expect(() => CPF.create({ value: '87970162850' })).toThrow(
      new InvalidCPFError('87970162850')
    )
    expect(() => CPF.create({ value: '91163671649' })).toThrow(
      new InvalidCPFError('91163671649')
    )
    expect(() => CPF.create({ value: '11034961952' })).toThrow(
      new InvalidCPFError('11034961952')
    )
    expect(() => CPF.create({ value: '16415798708' })).toThrow(
      new InvalidCPFError('16415798708')
    )
    expect(() => CPF.create({ value: '00547773802' })).toThrow(
      new InvalidCPFError('00547773802')
    )
    expect(() => CPF.create({ value: '38628541620' })).toThrow(
      new InvalidCPFError('38628541620')
    )
    expect(() => CPF.create({ value: '86285416164' })).toThrow(
      new InvalidCPFError('86285416164')
    )
    expect(() => CPF.create({ value: '20690510002' })).toThrow(
      new InvalidCPFError('20690510002')
    )
    expect(() => CPF.create({ value: '05200216463' })).toThrow(
      new InvalidCPFError('05200216463')
    )
    expect(() => CPF.create({ value: '50688001349' })).toThrow(
      new InvalidCPFError('50688001349')
    )
    expect(() => CPF.create({ value: '95741322465' })).toThrow(
      new InvalidCPFError('95741322465')
    )
    expect(() => CPF.create({ value: '45571074665' })).toThrow(
      new InvalidCPFError('45571074665')
    )
    expect(() => CPF.create({ value: '16398495706' })).toThrow(
      new InvalidCPFError('16398495706')
    )
    expect(() => CPF.create({ value: '09704687231' })).toThrow(
      new InvalidCPFError('09704687231')
    )
    expect(() => CPF.create({ value: '43916999900' })).toThrow(
      new InvalidCPFError('43916999900')
    )
    expect(() => CPF.create({ value: '14773664164' })).toThrow(
      new InvalidCPFError('14773664164')
    )
    expect(() => CPF.create({ value: '14930420012' })).toThrow(
      new InvalidCPFError('14930420012')
    )
    expect(() => CPF.create({ value: '49224416422' })).toThrow(
      new InvalidCPFError('49224416422')
    )
    expect(() => CPF.create({ value: '89821001220' })).toThrow(
      new InvalidCPFError('89821001220')
    )
    expect(() => CPF.create({ value: '91342031827' })).toThrow(
      new InvalidCPFError('91342031827')
    )
    expect(() => CPF.create({ value: '09600125964' })).toThrow(
      new InvalidCPFError('09600125964')
    )
    expect(() => CPF.create({ value: '34209963424' })).toThrow(
      new InvalidCPFError('34209963424')
    )
    expect(() => CPF.create({ value: '10070202471' })).toThrow(
      new InvalidCPFError('10070202471')
    )
    expect(() => CPF.create({ value: '16458085290' })).toThrow(
      new InvalidCPFError('16458085290')
    )
    expect(() => CPF.create({ value: '00547052301' })).toThrow(
      new InvalidCPFError('00547052301')
    )
    expect(() => CPF.create({ value: '41843352213' })).toThrow(
      new InvalidCPFError('41843352213')
    )
    expect(() => CPF.create({ value: '56769879080' })).toThrow(
      new InvalidCPFError('56769879080')
    )
    expect(() => CPF.create({ value: '96540316389' })).toThrow(
      new InvalidCPFError('96540316389')
    )
    expect(() => CPF.create({ value: '05702001187' })).toThrow(
      new InvalidCPFError('05702001187')
    )
    expect(() => CPF.create({ value: '63141648176' })).toThrow(
      new InvalidCPFError('63141648176')
    )
    expect(() => CPF.create({ value: '06307056186' })).toThrow(
      new InvalidCPFError('06307056186')
    )
    expect(() => CPF.create({ value: '03164587106' })).toThrow(
      new InvalidCPFError('03164587106')
    )
    expect(() => CPF.create({ value: '60200035722' })).toThrow(
      new InvalidCPFError('60200035722')
    )
    expect(() => CPF.create({ value: '34164153258' })).toThrow(
      new InvalidCPFError('34164153258')
    )
    expect(() => CPF.create({ value: '71077277954' })).toThrow(
      new InvalidCPFError('71077277954')
    )
    expect(() => CPF.create({ value: '12090522273' })).toThrow(
      new InvalidCPFError('12090522273')
    )
    expect(() => CPF.create({ value: '00123590394' })).toThrow(
      new InvalidCPFError('00123590394')
    )
    expect(() => CPF.create({ value: '63886648820' })).toThrow(
      new InvalidCPFError('63886648820')
    )
    expect(() => CPF.create({ value: '12387590416' })).toThrow(
      new InvalidCPFError('12387590416')
    )
    expect(() => CPF.create({ value: '63176673000' })).toThrow(
      new InvalidCPFError('63176673000')
    )
    expect(() => CPF.create({ value: '68860042071' })).toThrow(
      new InvalidCPFError('68860042071')
    )
    expect(() => CPF.create({ value: '47748910372' })).toThrow(
      new InvalidCPFError('47748910372')
    )
    expect(() => CPF.create({ value: '39106164873' })).toThrow(
      new InvalidCPFError('39106164873')
    )
    expect(() => CPF.create({ value: '05360001002' })).toThrow(
      new InvalidCPFError('05360001002')
    )
    expect(() => CPF.create({ value: '14616412908' })).toThrow(
      new InvalidCPFError('14616412908')
    )
    expect(() => CPF.create({ value: '75001419888' })).toThrow(
      new InvalidCPFError('75001419888')
    )
    expect(() => CPF.create({ value: '41643815103' })).toThrow(
      new InvalidCPFError('41643815103')
    )
    expect(() => CPF.create({ value: '13131647421' })).toThrow(
      new InvalidCPFError('13131647421')
    )
    expect(() => CPF.create({ value: '63933234191' })).toThrow(
      new InvalidCPFError('63933234191')
    )
    expect(() => CPF.create({ value: '01349848016' })).toThrow(
      new InvalidCPFError('01349848016')
    )
    expect(() => CPF.create({ value: '78265547001' })).toThrow(
      new InvalidCPFError('78265547001')
    )
    expect(() => CPF.create({ value: '71593741643' })).toThrow(
      new InvalidCPFError('71593741643')
    )
    expect(() => CPF.create({ value: '65627803417' })).toThrow(
      new InvalidCPFError('65627803417')
    )
    expect(() => CPF.create({ value: '07482164023' })).toThrow(
      new InvalidCPFError('07482164023')
    )
    expect(() => CPF.create({ value: '54141640230' })).toThrow(
      new InvalidCPFError('54141640230')
    )
    expect(() => CPF.create({ value: '41416393374' })).toThrow(
      new InvalidCPFError('41416393374')
    )
    expect(() => CPF.create({ value: '14125909385' })).toThrow(
      new InvalidCPFError('14125909385')
    )
    expect(() => CPF.create({ value: '31647478448' })).toThrow(
      new InvalidCPFError('31647478448')
    )
    expect(() => CPF.create({ value: '00128708504' })).toThrow(
      new InvalidCPFError('00128708504')
    )
    expect(() => CPF.create({ value: '37355728430' })).toThrow(
      new InvalidCPFError('37355728430')
    )
    expect(() => CPF.create({ value: '05580000020' })).toThrow(
      new InvalidCPFError('05580000020')
    )
    expect(() => CPF.create({ value: '24127383135' })).toThrow(
      new InvalidCPFError('24127383135')
    )
    expect(() => CPF.create({ value: '52814351651' })).toThrow(
      new InvalidCPFError('52814351651')
    )
    expect(() => CPF.create({ value: '01794613963' })).toThrow(
      new InvalidCPFError('01794613963')
    )
    expect(() => CPF.create({ value: '14466200658' })).toThrow(
      new InvalidCPFError('14466200658')
    )
    expect(() => CPF.create({ value: '22380117937' })).toThrow(
      new InvalidCPFError('22380117937')
    )
    expect(() => CPF.create({ value: '44016395617' })).toThrow(
      new InvalidCPFError('44016395617')
    )
    expect(() => CPF.create({ value: '25136458842' })).toThrow(
      new InvalidCPFError('25136458842')
    )
    expect(() => CPF.create({ value: '70164488647' })).toThrow(
      new InvalidCPFError('70164488647')
    )
    expect(() => CPF.create({ value: '21076058454' })).toThrow(
      new InvalidCPFError('21076058454')
    )
    expect(() => CPF.create({ value: '20605667254' })).toThrow(
      new InvalidCPFError('20605667254')
    )
    expect(() => CPF.create({ value: '13125774571' })).toThrow(
      new InvalidCPFError('13125774571')
    )
    expect(() => CPF.create({ value: '49838696870' })).toThrow(
      new InvalidCPFError('49838696870')
    )
    expect(() => CPF.create({ value: '93474440070' })).toThrow(
      new InvalidCPFError('93474440070')
    )
    expect(() => CPF.create({ value: '63563449711' })).toThrow(
      new InvalidCPFError('63563449711')
    )
    expect(() => CPF.create({ value: '71574961641' })).toThrow(
      new InvalidCPFError('71574961641')
    )
    expect(() => CPF.create({ value: '24258110633' })).toThrow(
      new InvalidCPFError('24258110633')
    )
    expect(() => CPF.create({ value: '37569164552' })).toThrow(
      new InvalidCPFError('37569164552')
    )
    expect(() => CPF.create({ value: '37720012209' })).toThrow(
      new InvalidCPFError('37720012209')
    )
    expect(() => CPF.create({ value: '33423746679' })).toThrow(
      new InvalidCPFError('33423746679')
    )
    expect(() => CPF.create({ value: '71013294584' })).toThrow(
      new InvalidCPFError('71013294584')
    )
    expect(() => CPF.create({ value: '81657933972' })).toThrow(
      new InvalidCPFError('81657933972')
    )
    expect(() => CPF.create({ value: '13592290936' })).toThrow(
      new InvalidCPFError('13592290936')
    )
    expect(() => CPF.create({ value: '66542351511' })).toThrow(
      new InvalidCPFError('66542351511')
    )
    expect(() => CPF.create({ value: '27089140016' })).toThrow(
      new InvalidCPFError('27089140016')
    )
    expect(() => CPF.create({ value: '68211082021' })).toThrow(
      new InvalidCPFError('68211082021')
    )
    expect(() => CPF.create({ value: '53126940420' })).toThrow(
      new InvalidCPFError('53126940420')
    )
    expect(() => CPF.create({ value: '10996983001' })).toThrow(
      new InvalidCPFError('10996983001')
    )
    expect(() => CPF.create({ value: '65483641656' })).toThrow(
      new InvalidCPFError('65483641656')
    )
    expect(() => CPF.create({ value: '19041910445' })).toThrow(
      new InvalidCPFError('19041910445')
    )
    expect(() => CPF.create({ value: '71142216663' })).toThrow(
      new InvalidCPFError('71142216663')
    )
    expect(() => CPF.create({ value: '19707709771' })).toThrow(
      new InvalidCPFError('19707709771')
    )
    expect(() => CPF.create({ value: '05418166268' })).toThrow(
      new InvalidCPFError('05418166268')
    )
    expect(() => CPF.create({ value: '09330008703' })).toThrow(
      new InvalidCPFError('09330008703')
    )
    expect(() => CPF.create({ value: '22416595968' })).toThrow(
      new InvalidCPFError('22416595968')
    )
    expect(() => CPF.create({ value: '30013559295' })).toThrow(
      new InvalidCPFError('30013559295')
    )
    expect(() => CPF.create({ value: '16592010798' })).toThrow(
      new InvalidCPFError('16592010798')
    )
    expect(() => CPF.create({ value: '28354084291' })).toThrow(
      new InvalidCPFError('28354084291')
    )
    expect(() => CPF.create({ value: '64138145600' })).toThrow(
      new InvalidCPFError('64138145600')
    )
    expect(() => CPF.create({ value: '19510554166' })).toThrow(
      new InvalidCPFError('19510554166')
    )
    expect(() => CPF.create({ value: '43127730001' })).toThrow(
      new InvalidCPFError('43127730001')
    )
    expect(() => CPF.create({ value: '73527420043' })).toThrow(
      new InvalidCPFError('73527420043')
    )
    expect(() => CPF.create({ value: '56663001264' })).toThrow(
      new InvalidCPFError('56663001264')
    )
    expect(() => CPF.create({ value: '39342004345' })).toThrow(
      new InvalidCPFError('39342004345')
    )
    expect(() => CPF.create({ value: '66300126493' })).toThrow(
      new InvalidCPFError('66300126493')
    )
    expect(() => CPF.create({ value: '34160767518' })).toThrow(
      new InvalidCPFError('34160767518')
    )
    expect(() => CPF.create({ value: '80116076751' })).toThrow(
      new InvalidCPFError('80116076751')
    )
    expect(() => CPF.create({ value: '28166339081' })).toThrow(
      new InvalidCPFError('28166339081')
    )
    expect(() => CPF.create({ value: '20093984841' })).toThrow(
      new InvalidCPFError('20093984841')
    )
    expect(() => CPF.create({ value: '16587878033' })).toThrow(
      new InvalidCPFError('16587878033')
    )
    expect(() => CPF.create({ value: '28577894311' })).toThrow(
      new InvalidCPFError('28577894311')
    )
    expect(() => CPF.create({ value: '63420279713' })).toThrow(
      new InvalidCPFError('63420279713')
    )
    expect(() => CPF.create({ value: '60938470165' })).toThrow(
      new InvalidCPFError('60938470165')
    )
    expect(() => CPF.create({ value: '80848580988' })).toThrow(
      new InvalidCPFError('80848580988')
    )
    expect(() => CPF.create({ value: '26947516651' })).toThrow(
      new InvalidCPFError('26947516651')
    )
    expect(() => CPF.create({ value: '52134345774' })).toThrow(
      new InvalidCPFError('52134345774')
    )
    expect(() => CPF.create({ value: '31609739428' })).toThrow(
      new InvalidCPFError('31609739428')
    )
    expect(() => CPF.create({ value: '70495415492' })).toThrow(
      new InvalidCPFError('70495415492')
    )
    expect(() => CPF.create({ value: '65438189571' })).toThrow(
      new InvalidCPFError('65438189571')
    )
    expect(() => CPF.create({ value: '22572490163' })).toThrow(
      new InvalidCPFError('22572490163')
    )
    expect(() => CPF.create({ value: '73066591333' })).toThrow(
      new InvalidCPFError('73066591333')
    )
    expect(() => CPF.create({ value: '34104171663' })).toThrow(
      new InvalidCPFError('34104171663')
    )
    expect(() => CPF.create({ value: '82592213234' })).toThrow(
      new InvalidCPFError('82592213234')
    )
    expect(() => CPF.create({ value: '21419166533' })).toThrow(
      new InvalidCPFError('21419166533')
    )
    expect(() => CPF.create({ value: '00500131609' })).toThrow(
      new InvalidCPFError('00500131609')
    )
    expect(() => CPF.create({ value: '99920042045' })).toThrow(
      new InvalidCPFError('99920042045')
    )
    expect(() => CPF.create({ value: '81001388141' })).toThrow(
      new InvalidCPFError('81001388141')
    )
    expect(() => CPF.create({ value: '42379500562' })).toThrow(
      new InvalidCPFError('42379500562')
    )
    expect(() => CPF.create({ value: '11980411475' })).toThrow(
      new InvalidCPFError('11980411475')
    )
    expect(() => CPF.create({ value: '63941416830' })).toThrow(
      new InvalidCPFError('63941416830')
    )
    expect(() => CPF.create({ value: '00133907934' })).toThrow(
      new InvalidCPFError('00133907934')
    )
    expect(() => CPF.create({ value: '37542888450' })).toThrow(
      new InvalidCPFError('37542888450')
    )
    expect(() => CPF.create({ value: '11502621416' })).toThrow(
      new InvalidCPFError('11502621416')
    )
    expect(() => CPF.create({ value: '74786569071' })).toThrow(
      new InvalidCPFError('74786569071')
    )
    expect(() => CPF.create({ value: '95754701404' })).toThrow(
      new InvalidCPFError('95754701404')
    )
    expect(() => CPF.create({ value: '40245308849' })).toThrow(
      new InvalidCPFError('40245308849')
    )
    expect(() => CPF.create({ value: '33114302068' })).toThrow(
      new InvalidCPFError('33114302068')
    )
    expect(() => CPF.create({ value: '61994700130' })).toThrow(
      new InvalidCPFError('61994700130')
    )
    expect(() => CPF.create({ value: '86524166785' })).toThrow(
      new InvalidCPFError('86524166785')
    )
    expect(() => CPF.create({ value: '96451331190' })).toThrow(
      new InvalidCPFError('96451331190')
    )
    expect(() => CPF.create({ value: '04792006308' })).toThrow(
      new InvalidCPFError('04792006308')
    )
    expect(() => CPF.create({ value: '93113635714' })).toThrow(
      new InvalidCPFError('93113635714')
    )
    expect(() => CPF.create({ value: '34166393737' })).toThrow(
      new InvalidCPFError('34166393737')
    )
    expect(() => CPF.create({ value: '81278542959' })).toThrow(
      new InvalidCPFError('81278542959')
    )
    expect(() => CPF.create({ value: '16640877210' })).toThrow(
      new InvalidCPFError('16640877210')
    )
    expect(() => CPF.create({ value: '38822244032' })).toThrow(
      new InvalidCPFError('38822244032')
    )
    expect(() => CPF.create({ value: '00817506600' })).toThrow(
      new InvalidCPFError('00817506600')
    )
    expect(() => CPF.create({ value: '16966764165' })).toThrow(
      new InvalidCPFError('16966764165')
    )
    expect(() => CPF.create({ value: '56579460138' })).toThrow(
      new InvalidCPFError('56579460138')
    )
    expect(() => CPF.create({ value: '60599416591' })).toThrow(
      new InvalidCPFError('60599416591')
    )
    expect(() => CPF.create({ value: '60314001129' })).toThrow(
      new InvalidCPFError('60314001129')
    )
    expect(() => CPF.create({ value: '60641658221' })).toThrow(
      new InvalidCPFError('60641658221')
    )
    expect(() => CPF.create({ value: '50719386444' })).toThrow(
      new InvalidCPFError('50719386444')
    )
    expect(() => CPF.create({ value: '01660343716' })).toThrow(
      new InvalidCPFError('01660343716')
    )
    expect(() => CPF.create({ value: '13692391446' })).toThrow(
      new InvalidCPFError('13692391446')
    )
    expect(() => CPF.create({ value: '51661128992' })).toThrow(
      new InvalidCPFError('51661128992')
    )
    expect(() => CPF.create({ value: '00119248314' })).toThrow(
      new InvalidCPFError('00119248314')
    )
    expect(() => CPF.create({ value: '32155397170' })).toThrow(
      new InvalidCPFError('32155397170')
    )
    expect(() => CPF.create({ value: '37017344071' })).toThrow(
      new InvalidCPFError('37017344071')
    )
    expect(() => CPF.create({ value: '58292024400' })).toThrow(
      new InvalidCPFError('58292024400')
    )
    expect(() => CPF.create({ value: '97915434166' })).toThrow(
      new InvalidCPFError('97915434166')
    )
    expect(() => CPF.create({ value: '82283961330' })).toThrow(
      new InvalidCPFError('82283961330')
    )
  })
})
